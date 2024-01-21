import json

def serialise_and_print_json(path):
    res = {}
    
    with open(path) as unserialised_json_response:
        unserialised_response = unserialised_json_response.read()
        serialised_response = json.loads(unserialised_response)
        unserialised_model = serialised_response["currentModel"]
        serialised_model = json.loads(unserialised_model)
        unserialised_chains = serialised_model["chain"]
        serialised_chains = json.loads(unserialised_chains)

        for chain in serialised_chains:
            word_freq = chain[1]
            for word in word_freq:
                if word not in res:
                    res[word] = 0
                res[word] += word_freq[word]
        
    return res

def top_words(word_freq):
    return sorted(word_freq, key=word_freq.get, reverse=True)[:25]

def word_cloud(path):
    word_freq = serialise_and_print_json(path)
    top_words_dict = top_words(word_freq)
    return [{"value": word, "count": word_freq[word]} for word in top_words_dict]

print(json.dumps(word_cloud("BarackObama_model.json")))