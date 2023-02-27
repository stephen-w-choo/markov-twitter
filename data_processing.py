import nltk

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
    # Takes a dictionary of word frequencies and returns a list of the top 20 words
    return sorted(word_freq, key=word_freq.get, reverse=True)[:25]

def word_cloud(text):
    # Takes a string and returns a list of the top 20 words in the format required for word cloud
    # [{"text": "word", "value": 10}, ...]
    word_freq = word_frequency(text)
    top_words = top_twenty_words(word_freq)
    return [{"value": word, "count": word_freq[word]} for word in top_words]
