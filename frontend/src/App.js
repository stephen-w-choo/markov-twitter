import './css/App.css';
import './css/fonts.css';
import './css/start.css';
import './css/model.css';
import './css/tweet.css';
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import CountUp from 'react-countup';
import FadeIn from 'react-fade-in';



library.add(fab)

function UserForm(props) {
  const [query, setQuery] = useState({
    username: ""
  })

  const handleChange = (event) => {
    setQuery({
      ...query,
      username: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(query)
    props.showMessage("Collecting tweets and generating model")

    fetch(
      `http://localhost:5000/markovify_user?username=${query.username}`,
      {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
      }
    )
    .then( (response) => {
      return response.json()
    })
    .then( (response) => {
      props.setUserModel({
        user: response.name,
        userHandle: response.username,
        userProfilePicture: response.userProfilePicture,
        currentModel: response.model,
        modelSize: response.modelSize,
        modelDate: response.modelDate,
      })
    })
    .catch( (error) => {
      console.log(error)
      props.showMessage(
        "Error - user was not found. Remember to type in your user handle without the @ \neg type BarackObama instead of @BarackObama"
      )
    })
  }

  // React.useEffect(() => {
  //   console.log("useEffect")
  //   if (props.userModel.currentModel) {
  //     props.generateTweets()
  //   }
  // }, [props.userModel.currentModel])

  return (
    <div>
      <form onSubmit = {handleSubmit}>
        <h3>Enter a twitter username</h3>
        <input
          type = "text"
          id = "search-input"
          name = "username"
          placeholder = "username eg BarackObama, AlboMP"
          value = {query.username}
          onChange = {handleChange}
        />
        <button> <FontAwesomeIcon icon={['fab', 'twitter']} /> Generate tweets </button>
      </form>
    </div>
  )
}

function TweetBox(props) {
  return (
    <div className="twitter-tweet">
      <div className="tweet-header">
        <img src={props.userModel.userProfilePicture} alt = "" ></img>
        <div className="tweeter-name-box">
          <div>{props.userModel.user}</div>
          <div className="tweeter-username">{props.userModel.userHandle && `@${props.userModel.userHandle}`}</div>
        </div>
      </div>
      <p>
        {props.tweet}
      </p>
    </div>
  )
}

function TweetDisplayArea(props) {
  return (
    <div>
      <FadeIn className="tweet-display-area">
        {props.tweets.map( (tweet, index) => {
          return <TweetBox userModel={props.userModel} tweet={tweet} key={index}/>
        })}
      </FadeIn>
    </div>
  )
}

function ModelDisplayArea(props) {
  return (
    <div className="model-display-area" style={{"width": "100%"}}>
      <h3>
        Language model generated for:
      </h3>
      <div className="model-box">
        <div className="model-profile">
          <img className="user-profile-picture" src={props.userModel.userProfilePicture} alt = "" ></img>
          <div>{props.userModel.user}</div>
          <div className="tweeter-username">{props.userModel.userHandle && `@${props.userModel.userHandle}`}</div>
        </div>

        <div className="model-information">
          <p>Generated using</p>
          <ul>
            <li>
              <CountUp end={props.userModel.modelSize} duration={1}/>
              <span>Tweets</span>
            </li>
          </ul>
          <ul>
            <li>
              From {props.userModel.modelDate}
            </li>
          </ul>
        </div>


      </div>
      <GenerateTweetsButton
      model={props.userModel.currentModel}
      setTweets={props.setTweets}
      generateTweets={props.generateTweets} />
    </div>
  )
}

function GenerateTweetsButton(props) {
  // takes a response from the markovify_user api and displays the user details and background of the tweets
  // has a button to generate tweets from the model
  // props needs to include:
  // changeTweets function
  // api_response json object



  return(
    <button
      onClick={props.generateTweets}> Generate Tweets
      </button>
  )
}

function StartScreen(props) {
  return (
    <div className="start-screen">
      <div className="start-instructions">
        <p> Enter a twitter username to generate random semi-plausible new tweets for the given user. </p>
        <p> Made using jsvine's Markovify library. </p>
      </div>
      <br></br>
      <UserForm
        userModel = {props.userModel}
        setUserModel={props.setUserModel}
        resetTweets={props.resetTweets}
        showMessage={props.showMessage}
        generateTweets={props.generateTweets}
      />
    </div>
  )
}

function App() {
  const [tweets, setTweets] = useState([])

  const [userModel, setUserModel] = useState({
    user: null,
    userHandle: null,
    userProfilePicture: null,
    currentModel: null, // unsure - storing the markov model in the state is probably a bit much - would be better in the session storage
    modelSize: null,
    modelDate: null,
  })

  const [tweetKey, setTweetKey] = useState(0)

  React.useEffect(() => {
    if (userModel.currentModel) {
      generateTweets()
    }
  }, [userModel.currentModel])

  React.useEffect(() => {
    setTweetKey(tweetKey + 1)
  }, [tweets])

  const generateTweets = (event) => {
    console.log(userModel)
    console.log(JSON.stringify(["test"]))
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
      setTweets(response.tweets)
    })
    .catch( (error) => {
      setTweets(["Error - user was not found. Remember to type in your user handle without the @ \neg type BarackObama instead of @BarackObama"])
    })
  }

  const showMessage = (message) => setTweets([message])

  const resetTweets = () => setTweets([])

  return (
    <div className="App">
      <header className="App-header">
        <div className="titlebar">
          <img className="logo" src={ require('./images/AAMarkov.jpg') } alt="logo" />
          <h2 className="title">Markov Tweet Generator</h2>
        </div>
        { !userModel.user &&
          <StartScreen
            userModel = {userModel}
            setUserModel={setUserModel}
            resetTweets={resetTweets}
            showMessage={showMessage}
            generateTweets={generateTweets}
          />
        }
        { userModel.user &&
          <ModelDisplayArea userModel={userModel} setTweets={setTweets} generateTweets={generateTweets}/>
        }
        <TweetDisplayArea key={tweetKey} tweets={tweets} userModel={userModel} generateTweets={generateTweets}/>
      </header>
    </div>
  );
}

export default App;
