from flask import Flask, request, jsonify
import requests
import json
import markovify
from dotenv import load_dotenv
import twitter_api_helpers
import language_helpers
import os
from flask_cors import CORS, cross_origin

load_dotenv()

payload={}
headers = {
    'Authorization': os.getenv("AUTHORIZATION")
}

application = app = Flask(__name__, static_folder='frontend/build', static_url_path='/')

CORS(app)


@app.route("/")
def index():
    return app.send_static_file('index.html')

# returns a Markov model in json format
@app.route("/markovify_user")
@cross_origin() # to be removed after development
def markovify_user():
    username = request.args.get('username')

    user_data = twitter_api_helpers.lookup_username(headers, username)

    if "errors" in user_data:
        print("error")
        return 500

    user_data = user_data["data"]
    user_id = user_data["id"]
    url = twitter_api_helpers.timeline_url(user_id)
    api_response = twitter_api_helpers.request(payload, headers, url)
    full_list = twitter_api_helpers.paginate(api_response, headers, url)
    corpus = twitter_api_helpers.twitter_json_to_string(full_list)
    corpus = language_helpers.filter(corpus)

    text_model = markovify.Text(corpus, retain_original=False)

    model_json = text_model.to_json()

    return jsonify(
        {
            "model": model_json,
            "name": user_data["name"],
            "username": username,
            "userProfilePicture": user_data["profile_image_url"],
            }
        )

@app.route("/generate_tweets", methods=["GET", "POST"])
@cross_origin() # to be removed after development
# takes a markov model in json format and generates 5 random tweets
def generate_tweets():
    if request.method == 'POST':
        res = []
        text_model = markovify.Text.from_json(request.get_json())
        for i in range(5):
            res.append(text_model.make_sentence())

        return jsonify({
            "tweets": res
        })
