from flask import Flask, request, jsonify
import markovify
from dotenv import load_dotenv
import twitter_api_helpers
import language_helpers
import data_processing
import os
from flask_cors import CORS, cross_origin

load_dotenv()

payload={}
headers = {
    'Authorization': os.getenv("AUTHORIZATION")
}

application = Flask(__name__, static_folder='frontend/build', static_url_path='/')

app = application

# CORS(app)


@app.route("/")
def index():
    return app.send_static_file('index.html')


# returns a Markov model in json format
@app.route("/markovify_user")
@cross_origin() # to be removed after development
def markovify_user():
    # look up the user from the twitter API
    username = request.args.get('username')
    tweet_n = int(request.args.get('tweetN')) // 100
    user_api_response = twitter_api_helpers.lookup_username(headers, username)

    # returns error if the user is not found
    if "errors" in user_api_response:
        print("error")
        return 500

    # get the user data and id
    user_data = user_api_response["data"]
    user_id = user_data["id"]

    # replace 'normal' with '400x400' to get the larger profile picture
    user_data["profile_image_url"] = user_data["profile_image_url"].replace("normal", "400x400")

    # get the corpus, to be returned as a json object
    tweet_list, model_tweet_count, model_start_date, model_end_date= twitter_api_helpers.twitter_user_to_corpus(user_id, headers, payload, tweet_n)
    corpus = language_helpers.filter("\n".join(tweet_list))
    model_word_count = len(corpus.split())
    word_cloud = data_processing.word_cloud(corpus)
    aggregate_sentiment = data_processing.aggregate_sentiment(tweet_list)

    text_model = markovify.Text(corpus, retain_original=False)
    model_json = text_model.to_json()

    return jsonify(
        {
            "model": model_json,
            "modelSize": {"words": model_word_count, "tweets": model_tweet_count},
            "modelDate": [model_start_date, model_end_date],
            "userMetrics": user_data["public_metrics"],
            "name": user_data["name"],
            "username": username,
            "userJoined": language_helpers.string_to_date(user_data["created_at"]).strftime("%b %Y"),
            "userProfilePicture": user_data["profile_image_url"],
            "analytics": {
                "aggregateSentiment": aggregate_sentiment,
                "wordCloud": word_cloud
                }
            }
        )

@app.route("/generate_tweets", methods=["GET", "POST"])
@cross_origin() # to be removed after development
# takes a markov model in json format and generates 5 random tweets
def generate_tweets():
    if request.method == 'POST':
        res = []
        request_json = request.get_json()
        text_model = markovify.Text.from_json(request_json["model"])

        # if "prompt" in request_json:
        #     res.append

        for i in range(5):
            res.append(text_model.make_sentence())

        return jsonify({
            "tweets": res
        })

if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    application.debug = True
    application.run()
