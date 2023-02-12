import requests
import json
import markovify
import re
from datetime import datetime

def filter(string):
    # Takes a string filters out unwanted words and returns the filtered string
    res = re.sub(r"http\S+", "", string)

    return res

def aggregate_sentiment(tweets):
    # Takes a list of tweets and returns the aggregate compounded sentiment
    pass

def string_to_date(date_string: str) -> datetime:
    # takes a date string and returns a datetime object
    return datetime.strptime(date_string, "%Y-%m-%dT%H:%M:%S.%fZ")

def datetime_to_month_year(date: datetime) -> str:
    # takes a datetime object and returns a string in the format "Month-Year"
    return date.strftime("%B-%Y")
