import './css/App.css';
import './css/fonts.css';
import './css/start.css';
import './css/model.css';
import './css/tweet.css';
import React, { useState } from "react";
import { ChakraProvider, Container } from '@chakra-ui/react'

import TitleBar from './components/TitleBar';
import ModelDisplayArea from './components/ModelDisplayArea';
import StartScreen from './components/StartScreen';
import StatusBox from "./components/StatusBox";
import TweetDisplayArea from './components/TweetDisplayArea';


function App() {

  const primaryColor = "#61777f"

  const [status, setStatus] = useState({
    message: null,
    loading: false,
    show: false,
    error: false,
  })

  const [tweets, setTweets] = useState([])

  // const [currentScreen, setCurrentScreen] = useState("start")

  const [userModel, setUserModel] = useState({
    user: null,
    userHandle: null,
    userProfilePicture: null,
    userMetrics: null,
    userJoined: null,
    currentModel: null, // unsure - storing the markov model in the state is probably a bit much - would be better in the session storage
    modelSize: null,
    modelDate: null,
  })

  const reset = () => {
    setUserModel({
      user: null,
      userHandle: null,
      userProfilePicture: null,
      userMetrics: null,
      userJoined: null,
      currentModel: null, // unsure - storing the markov model in the state is probably a bit much - would be better in the session storage
      modelSize: null,
      modelDate: null,
    })
    setTweets([])
    setStatus({
      message: null,
      loading: false,
      show: false,
      error: false,
    })
  }


  const [tweetKey, setTweetKey] = useState(0)

  React.useEffect(() => { // generates tweets when the model is loaded
    if (userModel.currentModel) { // this is because the new functional setstate doesn't update the state immediately
      generateTweets() // and doesn't allow for callbacks immediately after the state is set
    }
  }, [userModel.currentModel])

  React.useEffect(() => { // sets a key to the tweets to force remounting of the tweet display area
    setTweetKey(tweetKey + 1) // this is a bit of a hacky way to force the tweet display area to remount and trigger the fadein animation
  }, [tweets])

  const generateTweets = (event) => {
    console.log(userModel)
    setStatus({
      loading: true,
      message: "Generating tweets...",
      show: true,
      error: false
    })
    fetch("http://localhost:5000/generate_tweets", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userModel.currentModel)
      // body: JSON.stringify(["test"])
    })
    .then(response => {
      return response.json()
    })
    .then( (response) => {
      setStatus({
        message: null,
        loading: false,
        show: false,
        error: false,
      })
      setTweets(response.tweets)
    })
    .catch( (error) => {
      setTweets([])
      setStatus({
        message: "Error generating tweets",
        loading: false,
        show: false,
        error: true
      })
    })
  }

  const resetTweets = () => setTweets([])

  return (
    <ChakraProvider>
      <div className="App">
        <header className="App-header">
          <TitleBar logoSrc={require('./images/logo.png')} title="Markov Tweet Generator"/>
          <Container maxW='container.md' paddingTop={2}>
            { !userModel.user && // show the start screen if there is no user
              <StartScreen
                userModel = {userModel}
                setUserModel={setUserModel}
                resetTweets={resetTweets}
                generateTweets={generateTweets}
                status={status}
                setStatus={setStatus}
                primaryColor={primaryColor}
              />
            }

            { userModel.user &&
              <ModelDisplayArea
              userModel={userModel}
              setTweets={setTweets}
              generateTweets={generateTweets}
              reset={reset}/>
            }
            <TweetDisplayArea key={tweetKey} tweets={tweets} userModel={userModel} generateTweets={generateTweets}/>
            {
              status && <StatusBox status={status.show}/>
            }
          </Container>
        </header>
      </div>
    </ChakraProvider>
  );
}

export default App;
