from flask import Flask, request
import requests
import json
import markovify
from helpers import twitter_api_request, twitter_json_to_string


payload={}
headers = {
  'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAACzqiQEAAAAApOU5rbSXRCFlkKl6FbMBcYpWbRs%3DogC9gPfAXyBq6Hffg5fhpQim8EZJbQI2fk7GRv6UBFImQhmIWR',
  'Cookie': 'guest_id=v1%3A166666185727187801; guest_id_ads=v1%3A166666185727187801; guest_id_marketing=v1%3A166666185727187801; personalization_id="v1_vk3g4XNi3QHBL4TtG9EzAA=="'
}

# response = requests.request("GET", url, headers=headers, data=payload).json()

# text = []

# for object in response["data"]:
#     text.append(object["text"])

# text = "\n".join(text)

# print(text)

# # Build the model.
# text_model = markovify.Text(text)

# # Print five randomly-generated sentences
# for i in range(5):
#     print("sentence")
#     print(text_model.make_sentence())

app = Flask(__name__)


@app.route("/")
def index():
    return "<p>Hello, World!</p>"

@app.route("/user")
# searches for username as /user?username=value 
# and returns Markov model 
def username():
    username = request.args.get('username')
    url = f"https://api.twitter.com/2/tweets/search/recent?query=from:{username}&max_results=100"
    api_response = twitter_api_request(payload, headers, url)
    corpus = twitter_json_to_string(api_response)
    text_model = markovify.Text(corpus)

    return(text_model.make_sentence())

url = f"https://api.twitter.com/2/tweets/search/recent?query=from:BillSimmons&max_results=100"
api_response = twitter_api_request(payload, headers, url)
corpus = twitter_json_to_string(api_response)
text_model = markovify.Text(corpus)

print(text_model.make_sentence())