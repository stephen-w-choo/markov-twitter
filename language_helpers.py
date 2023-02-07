import requests
import json
import markovify
import re

def filter(string):
    # Takes a string filters out unwanted words and returns the filtered string
    res = re.sub(r"http\S+", "", string)

    return res

def aggregate_sentiment(tweets):
    # Takes a list of tweets and returns the aggregate compounded sentiment
    pass
