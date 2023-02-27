def word_frequency(text):
    # Takes a string and returns a dictionary of word frequencies
    words = text.split()
    word_freq = {}
    for word in words:
        if word in word_freq:
            word_freq[word] += 1
        else:
            word_freq[word] = 1
    return word_freq

def top_twenty_words(word_freq):
    # Takes a dictionary of word frequencies and returns a list of the top 20 words
    return sorted(word_freq, key=word_freq.get, reverse=True)[:20]

def word_cloud(text):
    # Takes a string and returns a list of the top 20 words in the format required for word cloud
    # [{"text": "word", "value": 10}, ...]
    word_freq = word_frequency(text)
    top_words = top_twenty_words(word_freq)
    return [{"text": word, "value": word_freq[word]} for word in top_words]
