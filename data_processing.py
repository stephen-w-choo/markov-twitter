import nltk
nltk.download('vader_lexicon')
nltk.download('stopwords')

from nltk.sentiment.vader import SentimentIntensityAnalyzer

# class LanguageProcessors:
    # singleton class to hold functions that process text data

def word_frequency(text):
    # Takes a string and returns a dictionary of word frequencies
    words = text.split()
    word_freq = {}
    stop_words = set(nltk.corpus.stopwords.words('english'))
    for word in words:
        # downcase
        word = word.lower()
        # remove punctuation, leaving @ and # for hashtags and mentions
        word = word.strip(".,!?;:()[]{}")
        # skip stopwords
        if word in stop_words:
            continue
        if word in word_freq:
            word_freq[word] += 1
        else:
            word_freq[word] = 1
    return word_freq

def top_twenty_words(word_freq):
    # Takes a dictionary of word frequencies and returns a list of the top 25 words
    return sorted(word_freq, key=word_freq.get, reverse=True)[:25]

def word_cloud(text):
    # Takes a string and returns a list of the top 20 words in the format required for word cloud
    # [{"text": "word", "value": 10}, ...]
    word_freq = word_frequency(text)
    top_words = top_twenty_words(word_freq)
    return [{"value": word, "count": word_freq[word]} for word in top_words]

def aggregate_sentiment(tweets):
    # Takes a list of tweets and returns a dictionary consisting of sentiment: count
    # will group sentiment into -2, -1, 0, 1, 2
    # -2: -1.0 to -0.6, -1: -0.6 to -0.2, 0: -0.2 to 0.2, 1: 0.2 to 0.6, 2: 0.6 to 1.0

    groups = {
        -0.6: "1 - very negative",
        -0.2: "2 - negative",
        0.2: "3 - neutral",
        0.6: "4 - positive",
        1.0: "5 - very positive"
    }

    res = {
        "1 - very negative": 0,
        "2 - negative": 0,
        "3 - neutral": 0,
        "4 - positive": 0,
        "5 - very positive": 0
    }

    sid = SentimentIntensityAnalyzer()
    for tweet in tweets:
        sentiment_score = sid.polarity_scores(tweet)["compound"]
        # this feels so bad there has to be a better way
        for key in groups:
            if sentiment_score < key:
                res[groups[key]] += 1
                break

    return res
