import requests
import json
import markovify
from datetime import datetime
from language_helpers import string_to_date, datetime_to_month_year


class TwitterUser:
    def __init__(self, headers, user_handle):
        self.user_handle = user_handle
        self.headers = headers  # headers for API requests
        self.data = self.lookup_username(user_handle)["data"]

        self.upscale_profile_picture()

    def request(self, url):
        # takes a url and returns the json response
        response = requests.request("GET", url, headers=self.headers).json()
        return response

    def lookup_username(self, user_handle):
        # takes a user handle and returns the user data from the API
        url = f"https://api.twitter.com/2/users/by/username/{user_handle}?user.fields=profile_image_url,created_at,public_metrics"
        response = self.request(url)
        return response

    def timeline_url(self):
        return f"https://api.twitter.com/2/users/{self.data['id']}/tweets?tweet.fields=created_at&max_results=100"

    def upscale_profile_picture(self):
        # replaces the profile picture url with a larger version
        self.data["profile_image_url"] = self.data["profile_image_url"].replace("normal", "400x400")

    def paginate_api_response(self, api_response, pages):
        # takes an api response and uses the next token to extend the list n number of times
        # returns the extended list of tweet objects
        current_list = api_response["data"]
        current_response = api_response

        for i in range(pages - 1):
            try:
                next_token = current_response["meta"]["next_token"]
            except:
                break
            next_response = self.request(self.timeline_url() + f"&pagination_token={next_token}")
            current_list.extend(next_response["data"])
            current_response = next_response

        return current_list

    def process_tweet_objects(self, tweet_object_list):
        # takes a list of tweet objects and returns a list of tweets
        # also returns the start and end dates of the corpus
        tweets = []
        print(tweet_object_list)
        for tweet_object in tweet_object_list:
            print(tweet_object)
            print(tweet_object["text"])
            tweets.append(tweet_object["text"])

        startdate = string_to_date(tweet_object_list[-1]["created_at"])
        enddate = string_to_date(tweet_object_list[0]["created_at"])

        return (tweets, startdate, enddate)

    def get_tweet_corpus(self, pages=4):
        # takes a user id and returns a corpus of tweets as a string, will paginate 4 times by default
        url = self.timeline_url()
        api_response = self.request(url)
        full_list = self.paginate_api_response(api_response, pages)
        tweet_list, startdate, enddate = self.process_tweet_objects(full_list)

        return (tweet_list, startdate, enddate)
