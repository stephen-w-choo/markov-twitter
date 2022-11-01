import './App.css';
import { useState } from "react";

function UserForm(props) {
  const [query, setQuery] = useState({
    username: ""
  })

  const handleChange = (event) => {
    setQuery({
      ...query,
      username: event.target.value})
  }

  const displayTweets = (tweets) => {
    props.changeTweets(tweets)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(query)
    displayTweets({
      tweets: ["Markovifying and generating tweets..."],
    })
    fetch(`/markovify_user?username=${query.username}`)
    .then(response => response.json())
    .then( (response) => {
      console.log(response)
      displayTweets(response)
    })
  }

  return (
    <div>
      <form onSubmit = {handleSubmit}>
        <h3>Enter a twitter username</h3>
        <input
          type = "text"
          name = "username"
          placeholder = "username eg BarackObama, JoeRogan"
          value = {query.username}
          onChange = {handleChange}
        />
        <button> Markovify! </button>
      </form>
    </div>
  )
}

function TweetBox(props) {
  console.log(props)
  return (
    <div className="twitter-tweet">
      <div className="tweet-header">
        <img src={props.state.tweeterAvatar} alt = "" ></img>
        <div className="tweeter-name-box">
          <div>{props.state.tweeter}</div>
          <div className="tweeter-username">{props.state.tweeterHandle && `@${props.state.tweeterHandle}`}</div>
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
      {props.state.tweets.map( (tweet) => {
        return <TweetBox state={props.state} tweet={tweet}/>
      })}
    </div>
  )
}

function App() {
  const [state, setState] = useState({
    tweets: [],
    tweeterAvatar: ""
  })

  const changeTweets = (response) => setState( {
    ...state,
    tweets: response.tweets,
    tweeterHandle: response.username,
    tweeter: response.name,
    tweeterAvatar: response.profile_image_url
  })

  return (
    <div className="App">
      <header className="App-header">
        <h1>Markov Caricatures</h1>
        <img className="logo" src={ require('./images/AAMarkov.jpg') } alt="logo" />
        <h6>Andrey Markov</h6>
        <p> Enter a twitter username to generate random semi-plausible new tweets for the given user. </p>
        <p> The random tweets are generated from a Markov model based on the user's existing tweets. </p>
        <p> Made using jsvine's Markovify library. </p>
        <UserForm
          changeTweets={changeTweets}
          />
        <TweetDisplayArea state = {state} />
      </header>
    </div>
  );
}

export default App;
