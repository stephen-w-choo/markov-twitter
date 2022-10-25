import requests
import json
import markovify



def twitter_api_request(payload, headers, url_request):
    # takes an API get request and returns a dictionary
    # the dict will have the shape {"data":{}, "meta"}
    return requests.request("GET", url_request, headers=headers, data=payload).json()

def twitter_json_to_string(api_response):
    # Takes the data object from the API response and converts to a string
    text = []

    for object in api_response["data"]:
        text.append(object["text"])

    return "\n".join(text)

    
