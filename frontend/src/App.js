import './App.css';
import './start.css';
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import CountUp from 'react-countup';



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
      console.log(response)
      return response.json()
    })
    .then( (response) => {
      console.log(response)
      props.setUser(response)
    })
    .catch( (error) => {
      console.log(error)
      props.showMessage(
        "Error - user was not found. Remember to type in your user handle without the @ \neg type BarackObama instead of @BarackObama"
      )
    })
  }

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
        <img src={props.state.userProfilePicture} alt = "" ></img>
        <div className="tweeter-name-box">
          <div>{props.state.user}</div>
          <div className="tweeter-username">{props.state.userHandle && `@${props.state.userHandle}`}</div>
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
    <div className="tweet-display-area">
      {props.state.tweets.map( (tweet, index) => {
        return <TweetBox state={props.state} tweet={tweet} key={index}/>
      })}
    </div>
  )
}

function ModelDisplayArea(props) {
  return (

    <div className="model-display-area" style={{"width": "100%"}}>
      <h3>
        Markov model loaded for:
      </h3>
      <div className="twitter-tweet">
        <div className="tweet-header">
          <img src={props.state.userProfilePicture} alt = "" ></img>
          <div className="tweeter-name-box">
            <div>{props.state.user}</div>
            <div className="tweeter-username">{props.state.userHandle && `@${props.state.userHandle}`}</div>
          </div>
        </div>
        <p>
          Markov model generated from <CountUp end={props.state.modelSize} duration={1}/> tweets from {props.state.modelDate}
        </p>
      </div>
      <GenerateTweetsButton model={props.state.currentModel} changeTweets={props.changeTweets} generateTweets={props.generateTweets} />
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
        setUser={props.setUser}
        resetTweets={props.resetTweets}
        showMessage={props.showMessage}
      />
    </div>
  )
}

function App() {
  const [state, setState] = useState({
    user: null,
    userHandle: null,
    userProfilePicture: null,
    currentModel: null, // unsure - storing the markov model in the state is probably a bit much - would be better in the session storage
    modelSize: null,
    modelDate: null,
    tweets: [],
  })

  const setUser = (response) => setState( {
    ...state,
    user: response.name,
    userHandle: response.username,
    userProfilePicture: response.userProfilePicture,
    currentModel: response.model,
    modelSize: response.modelSize,
    modelDate: response.modelDate,
    tweets: []
  })

  const changeTweets = (response) => setState( {
    ...state,
    tweets: response.tweets,
  })

  const generateTweets = (event) => {
    event.preventDefault();
    console.log(event)
    changeTweets({
      tweets: ["Markovifying and generating tweets..."],
    })
    console.log(JSON.stringify(["test"]))
    fetch("http://localhost:5000/generate_tweets", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state.currentModel)
      // body: JSON.stringify(["test"])
    })
    .then(response => {
      console.log(response)
      return response.json()
    })
    .then( (response) => {
      console.log(response)
      changeTweets(response)
    })
    .catch( (error) => {
      changeTweets({
        tweets: ["Error - user was not found. Remember to type in your user handle without the @ \neg type BarackObama instead of @BarackObama"],
      })
    })
  }

  const showMessage = (message) => setState( {
    ...state,
    user: null,
    userHandle: null,
    userProfilePicture: null,
    currentModel: null,
    tweets: [message],
  })

  const resetTweets = () => setState( {
    ...state,
    tweets: [],
  })



  return (
    <div className="App">
      <header className="App-header">
        <div className="titlebar">
          <img className="logo" src={ require('./images/AAMarkov.jpg') } alt="logo" />
          <h2 className="title">Markov Tweet Generator</h2>
        </div>
        { !state.user &&
          <StartScreen
            setUser={setUser}
            resetTweets={resetTweets}
            showMessage={showMessage}
          />
        }
        { state.user &&
          <ModelDisplayArea state={state} changeTweets={changeTweets} generateTweets={generateTweets}/>
        }
        <TweetDisplayArea state={state} generateTweets={generateTweets}/>
      </header>
    </div>
  );
}

export default App;
