# Markov Twitter

This is Markov Twitter - a small web app that lets you create simple language models using Twitter users as an input. 

You can find it [here](https://markovtwitter.com).

## Description

This website lets you input Twitter handles - it then makes a call to the Twitter API to pull a given number of tweets.

The tweets are then tokenised and combined into a text corpus, after which the Markovify library is used to generate a simple Markov model based on the above text corpus.

You can save and upload previously generated models.


### Things I've learnt making this project

* I will probably need to enforce something like a ViewModel pattern in the future, as well as something like ReactRouter - this project has neither, and I ended up with an incredibly bloated main App Component due to the sheer amount of different state objects it had to hold, as well as common methods that had to be kept in the main parent component so it could be passed down to the child components.

* The twitter API is incredibly generous with the quality and quantity of data - it's also really well documented, while also being really well designed and flexible. Absolutely a pleasure to use.

* I now understand why Docker is a thing. I've made simpler projects in Flask without Docker before - you can usually just throw the source bundle at AWS Elastic Beanstalk and it'll work straight away. This one is complex enough that I started encountering quite a few problems - I got it to work eventually, but the lesson I've now learnt is that I'll need to use Docker for any moderately complex project in the future.

* ChakraUI is fun and intuitive - I like that it's reasonably opinionated, which suits my complete lack of design background. I've tried using a bit of Chakra, Tailwind, and MaterialUI - between the three of them I'd say Chakra has easily been my favourite so far.

### Things I want to add in the future

* Being able to upload and generate Markov models from plaintext - I'll need to make a new state component for this - the rest shouldn't be too hard
* More analysis of the models - adding things like word frequency, sentiment analysis, etc.
* Being able to save and retrieve previously generated models to LocalStorage


## Acknowledgments

jsvine's Markovify library - incredibly well made and well written, easy to use, this project is pretty much built around it.
