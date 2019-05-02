from TwitterAPI import TwitterAPI
import boto3
import json
import twitterCreds
import re
from textblob import TextBlob
import threading


def clean_tweet(tweet):
    ''' 
    Utility function to clean tweet text by removing links, special characters 
    using simple regex statements. 
    '''
    return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", tweet).split())


def congressThread():
    '''
    A separate Thread to query twitter for posts containing certain keywords and puts thyem into a kinesis stream
    '''
    r = api.request('statuses/filter', {
        'track': ['Congress', 'Sonia', 'Gandhi', 'Rahul', 'Pappu']
    })
    # r = api.request('search/tweets')
    for tweet in r:
        streamValue = {}
        # print tweet['text']
        cleanedTweet = clean_tweet(tweet['text'])
        # print cleanedTweet
        value = TextBlob(cleanedTweet)
        if tweet['retweet_count'] == 0 and value.sentiment.polarity != 0:
            streamValue['tweet'] = cleanedTweet
            streamValue['polarity'] = value.sentiment.polarity
            streamValue['party'] = "Congress"
            data = json.dumps(streamValue)
            data += '\n'
            kinesis.put_record(StreamName="twitter",
                               Data=data, PartitionKey="filler")


def bjpThread():
    r = api.request('statuses/filter', {
        'track': ['BJP', 'Modi', 'Mitron', 'Gujrat', 'Amit']
    })
    # r = api.request('search/tweets')
    for tweet in r:
        streamValue = {}
        # print tweet['text']
        cleanedTweet = clean_tweet(tweet['text'])
        # print cleanedTweet
        value = TextBlob(cleanedTweet)
        if tweet['retweet_count'] == 0 and value.sentiment.polarity != 0:
            streamValue['tweet'] = cleanedTweet
            streamValue['polarity'] = value.sentiment.polarity
            streamValue['party'] = "BJP"
            data = json.dumps(streamValue)
            data += '\n'
            kinesis.put_record(StreamName="twitter",
                               Data=data, PartitionKey="filler")


# twitter credentials
consumer_key = twitterCreds.consumer_key
consumer_secret = twitterCreds.consumer_secret
access_token_key = twitterCreds.access_token_key
access_token_secret = twitterCreds.access_token_secret

api = TwitterAPI(consumer_key, consumer_secret,
                 access_token_key, access_token_secret)

kinesis = boto3.client('kinesis')

t1 = threading.Thread(target=congressThread)
t2 = threading.Thread(target=bjpThread)

t1.start()
t2.start()

t1.join()
t2.join()
