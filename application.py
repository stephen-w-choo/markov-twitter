from flask import Flask, request, jsonify
import requests
import json
import markovify
from dotenv import load_dotenv
from helpers import lookup_username, timeline_api_url, twitter_api_request, twitter_json_to_string, paginate
import os

load_dotenv()

payload={}
headers = {
    'Authorization': os.getenv("AUTHORIZATION")
}

application = app = Flask(__name__, static_folder='frontend/build', static_url_path='/')


@app.route("/")
def index():
    return app.send_static_file('index.html')

@app.route("/markovify_user")
def markovify_user():
    username = request.args.get('username')
    user_data = lookup_username(headers, username)

    if "errors" in user_data:
        print("error")
        return 500

    user_data = user_data["data"]
    user_id = user_data["id"]
    name = user_data["name"]
    profile_picture = user_data["profile_image_url"]
    url = timeline_api_url(user_id)
    api_response = twitter_api_request(payload, headers, url)
    full_list = paginate(api_response, headers, url)
    corpus = twitter_json_to_string(full_list)

    text_model = markovify.Text(corpus)

    res = []
    for i in range(5):
        res.append(text_model.make_sentence(test_output=False))

    return jsonify({
            "tweets": res,
            "name": name,
            "username": username,
            "profile_image_url": profile_picture,
            }
        )

# searches for username as /user?username=value

# and returns Markov model

@app.route("/markovify_list")
# calls the twitter list api

# takes the json returned by the api and converts to a string

# generates markov model from the generated string

# generates 3 random tweets and returns as a list


def username():
    username = request.args.get('username')
    url = f"https://api.twitter.com/2/tweets/search/recent?query=from:{username}&max_results=100"
    api_response = twitter_api_request(payload, headers, url)
    corpus = twitter_json_to_string(api_response)
    text_model = markovify.Text(corpus)

    return(text_model.make_sentence())
