import requests
import json
import markovify

def lookup_username(headers, user_handle):
    # takes a user handle and returns the user id
    url = f"https://api.twitter.com/2/users/by/username/{user_handle}?user.fields=profile_image_url"
    response = requests.request("GET", url, headers=headers).json()
    return response

def timeline_url(user_id):
    return f"https://api.twitter.com/2/users/{user_id}/tweets?max_results=100"

def request(payload, headers, url_request):
    # takes an API get request and returns a dictionary
    # the dict will have the shape {"data":{}, "meta"}
    return requests.request(
        "GET",
        url_request,
        headers=headers,
        data=payload
    ).json()


def paginate(api_response, headers, url_request):
    # takes an api response and uses the next token to extend the list 1 times
    # returns the extended list
    current_list = api_response["data"]
    current_response = api_response

    for i in range(1):
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


def twitter_json_to_string(list_of_tweet_objects):
    # Takes the data object from the API response and converts to a string
    text = []

    for object in list_of_tweet_objects:
        text.append(object["text"])

    return "\n".join(text)


def tokenize(string):
    # Takes a string and returns an array of lowercase words with stopwords and punctuation stripped

    word_list = nltk.tokenize.word_tokenize(document)

    res = []

    punctuation = list(string.punctuation)
    stopwords = nltk.corpus.stopwords.words("english")

    unwanted_words = set(punctuation + stopwords)

    for word in word_list:
        word = word.lower()
        if word not in unwanted_words:
            if word[:5] != "https":
                res.append(word)

    return res


def aggregate_sentiment(tweets):
    # Takes a list of tweets and returns the aggregate compounded sentiment
    pass
