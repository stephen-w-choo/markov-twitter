import requests
import json
import markovify

def lookup_username(headers: str, user_handle: str) -> str:
    # takes a user handle and returns the user id
    url = f"https://api.twitter.com/2/users/by/username/{user_handle}?user.fields=profile_image_url"
    response = requests.request("GET", url, headers=headers).json()
    return response

def timeline_url(user_id: str) -> str:
    return f"https://api.twitter.com/2/users/{user_id}/tweets?tweet.fields=created_at&max_results=100"

def request(payload: dict, headers: dict, url_request: str) -> dict:
    # takes an API get request and returns a dictionary
    # the dict will have the shape {"data":{}, "meta"}
    return requests.request(
        "GET",
        url_request,
        headers=headers,
        data=payload
    ).json()


def paginate(api_response: dict, headers: dict, url_request: dict, pages: int) -> list:
    # takes an api response and uses the next token to extend the list 1 times
    # returns the extended list
    current_list = api_response["data"]
    current_response = api_response

    for i in range(pages):
        next_token = current_response["meta"]["next_token"]
        if not next_token:
            break
        next_response = requests.request(
            "GET",
            f"{url_request}&pagination_token={next_token}",
            headers=headers,
        ).json()
        current_list.extend(next_response["data"])
        current_response = next_response

    return current_list


def twitter_json_to_string(list_of_tweet_objects: list) -> tuple[str, int, str]:
    # Takes the data object from the API response and converts to a string
    # returns the string, the number of tweets, and the date range
    text = []

    n_tweets = len(list_of_tweet_objects)

    for object in list_of_tweet_objects:
        text.append(object["text"])

    return ("\n".join(text), n_tweets, f"{list_of_tweet_objects[0]['created_at']} - {list_of_tweet_objects[-1]['created_at']}")

def twitter_user_to_corpus(user_id, headers, payload, tweet_pages=4) -> tuple[str, int, str]:
    # Takes a user id and returns a corpus of tweets as a string, will paginate 4 times by default
    url = timeline_url(user_id)
    api_response = request(payload, headers, url)
    full_list = paginate(api_response, headers, url, tweet_pages)
    corpus, n_tweets, date_range = twitter_json_to_string(full_list)

    return (corpus, n_tweets, date_range)

def aggregate_sentiment(tweets):
    # Takes a list of tweets and returns the aggregate compounded sentiment
    pass
