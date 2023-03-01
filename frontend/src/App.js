import './css/App.css';
import './css/fonts.css';
import './css/start.css';
import './css/model.css';
import './css/tweet.css';
import React, { useState } from "react";
import { Button, ChakraProvider, Container, FormControl, FormLabel, Input, VisuallyHiddenInput } from '@chakra-ui/react'

import TitleBar from './components/TitleBar';
import ModelDisplayArea from './components/ModelDisplayArea';
import StartScreen from './components/StartScreen';
import TweetDisplayArea from './components/TweetDisplayArea';

// this file WILL eventually be refactored
// I sincerely apologise for this mess


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
    analytics: null,
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
      analytics: null,
      user: null,
      userHandle: null,
      userProfilePicture: null,
      userMetrics: null,
      userJoined: null,
      currentModel: null,
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

  React.useEffect(() => { // generates tweets when the model is loaded or changed
    if (userModel.currentModel) { // this is because the new functional setstate doesn't update the state immediately
      generateTweets() // and doesn't allow for callbacks immediately after the state is set
    }                   // there's probably a better way to do this
  }, [userModel.currentModel])

  React.useEffect(() => { // sets a key to the tweets to force remounting of the tweet display area
    setTweetKey(tweetKey + 1) // this is a bit of a hacky way to force the tweet display area to remount and trigger the fadein animation
  }, [tweets])

  const generateTweets = (event) => {
    setStatus({
      loading: true,
      message: "Generating tweets...",
      show: true,
      error: false
    })
    fetch("/generate_tweets", {
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

  const downloadFile = ({ data, fileName, fileType }) => {
    // Create a blob with the data we want to download as a file
    const blob = new Blob([data], { type: fileType })
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
  }

  const exportToJson = e => {
    e.preventDefault()
    downloadFile({
      data: JSON.stringify(userModel),
      fileName: `${userModel.userHandle}_model.json`,
      fileType: 'text/json',
    })
  }

  const importJson = e => {
    e.preventDefault()
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = e => {
      const json = JSON.parse(e.target.result)
      setUserModel(json)
    }
    reader.readAsText(file)
  }

  const ImportJsonButton = () => {
    return (
      <div>
        <Button colorScheme={"teal"}>
        <FormLabel
          htmlFor="import-json"
          className="import-button"
          h="100%"
          w="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          m="0"
          _hover={{ cursor: "pointer" }}
        >
            Upload a previous model (.json)
          <Input
          colorScheme={"teal"}
          type="file"
          id="import-json"
          accept=".json"
          onChange={importJson}
          h="100%"
          w="100%"
          display="none"
        />
        </FormLabel>
        </Button>

      </div>
    )
  }

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
                ImportJsonButton={ImportJsonButton}
              />
            }

            { userModel.user &&
              <ModelDisplayArea
                userModel={userModel}
                setTweets={setTweets}
                generateTweets={generateTweets}
                reset={reset}
                status={status}
                exportToJson={exportToJson}
              />
            }
            <TweetDisplayArea key={tweetKey} tweets={tweets} userModel={userModel} generateTweets={generateTweets}/>
          </Container>
        </header>
      </div>
    </ChakraProvider>
  );
}

export default App;
