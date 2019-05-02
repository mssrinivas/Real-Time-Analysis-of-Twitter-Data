from __future__ import print_function
#import json
import base64
import logging
import pymysql
import sys

rds_host  = "tweets.ck2hvfzr43j1.us-west-2.rds.amazonaws.com"
name = "cmpe266user"
password = "*********"
db_name = "tweets"
logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    '''
    This function is called when the lambda function is triggered
    This will connect to the RDS database and add the values into the table
    @param event Event payload of whichever event triggered 
    @param context Context of the event
    '''
    
    try:
        conn = pymysql.connect(rds_host, user=name, passwd=password, db=db_name, connect_timeout=5)
    except:
        logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.")
        sys.exit()
    for record in event['Records']:
        with conn.cursor() as cur:
             payload=eval(base64.b64decode(record["kinesis"]["data"]))
             tempQuery = "insert into tweets (party, polarity) values(\"" +payload["party"] + "\"," + str(payload["polarity"]) + ");"
             print(tempQuery)
             cur.execute(tempQuery)
        conn.commit()
