import './App.css';
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'



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
      <p> {props.state.user} </p>
      <img src={props.state.userProfilePicture} alt = "" ></img>
      <GenerateTweetsButton model={props.state.currentModel} changeTweets={props.changeTweets} />
    </div>
  )
}

function GenerateTweetsButton(props) {
  // takes a response from the markovify_user api and displays the user details and background of the tweets
  // has a button to generate tweets from the model
  // props needs to include:
  // changeTweets function
  // api_response json object

  const generateTweets = (event) => {
    event.preventDefault();
    console.log(event)
    props.changeTweets({
      tweets: ["Markovifying and generating tweets..."],
    })
    console.log(JSON.stringify(["test"]))
    fetch("http://localhost:5000/generate_tweets", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(props.model)
      // body: JSON.stringify(["test"])
    })
    .then(response => {
      console.log(response)
      return response.json()
    })
    .then( (response) => {
      console.log(response)
      props.changeTweets(response)
    })
    .catch( (error) => {
      props.changeTweets({
        tweets: ["Error - user was not found. Remember to type in your user handle without the @ \neg type BarackObama instead of @BarackObama"],
      })
    })
  }

  return(
    <button
      onClick={generateTweets}> Generate Tweets
      </button>
  )
}

function StartScreen(props) {
  return (
    <div className="start-screen">
    <img className="logo" src={ require('./images/AAMarkov.jpg') } alt="logo" />
      <h6>Andrey Markov</h6>
      <br></br>
      <p> Enter a twitter username to generate random semi-plausible new tweets for the given user. </p>
      <p> The random tweets are generated from a Markov model based on the user's existing tweets. </p>
      <p> Made using jsvine's Markovify library. </p>
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
        <h1>Twitter Caricatures</h1>
        { !state.user &&
          <StartScreen
            setUser={setUser}
            resetTweets={resetTweets}
            showMessage={showMessage}
          />
        }
        { state.user &&
          <ModelDisplayArea state={state} changeTweets={changeTweets} />
        }
        <TweetDisplayArea state = {state} />
      </header>
    </div>
  );
}

export default App;
