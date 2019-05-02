from TwitterAPI import TwitterAPI
import boto3
import json
import twitterCreds
import re
from textblob import TextBlob
import threading


def congressThread():
    '''
    A separate Thread to query twitter for posts containing certain keywords and puts thyem into a kinesis stream
    '''


def bjpThread():
    #ToDO


## twitter credentials

consumer_key = twitterCreds.consumer_key
consumer_secret = twitterCreds.consumer_secret
access_token_key = twitterCreds.access_token_key
access_token_secret = twitterCreds.access_token_secret

api = TwitterAPI(consumer_key, consumer_secret, access_token_key, access_token_secret)

kinesis = boto3.client('kinesis')

t1 = threading.Thread(target=congressThread)
t2 = threading.Thread(target=bjpThread)

t1.start()
t2.start()

t1.join()
t2.join()
