from flask import Flask, request
import requests
import json
import markovify
from dotenv import load_dotenv
from helpers import lookup_user_id, timeline_api_url, twitter_api_request, twitter_json_to_string, paginate
import os

load_dotenv()

payload={}
headers = {
    'Authorization': os.getenv("AUTHORIZATION")
}

username = "JoeRogan"
user_id = lookup_user_id(headers, username)
url = timeline_api_url(user_id)
api_response = twitter_api_request(payload, headers, url)
full_list = paginate(api_response, headers, url)
corpus = twitter_json_to_string(full_list)
text_model = markovify.Text(corpus)



print(text_model.make_sentence())
print(text_model.make_sentence())
print(text_model.make_sentence())
print(text_model.make_sentence())
print(text_model.make_sentence())
