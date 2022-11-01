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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(query)
    displayResponse(["test array", "test array"])
    fetch(`/markovify_user?username=${query.username}`)
    .then(response => response.json())
    .then(response => displayResponse(response))
  }

  const displayResponse = (tweets) => {
    props.changeTweetsInState(tweets)
  }

  return (
    <div>
      <form
        onSubmit = {handleSubmit}
      >
        <h3>Enter a twitter username</h3>
        <input
        type = "text"
        name = "username"
        placeholder = "username"
        value = {query.username}
        onChange = {handleChange}
        />
        <button> Markovify! </button>
      </form>
    </div>
  )
}

function TweetBox(props) {
  return (
    <div className="twitter-tweet">
      {props.tweeter}
      <p>
        {props.tweet}
      </p>
    </div>
  )
}

function TweetDisplayArea(props) {
  return (
    <div className="tweet-display-area">
      {props.tweets.map( (tweet) => {
        return <TweetBox tweeter="test" tweet={tweet} />
      })}
    </div>
  )
}

function App() {
  const [state, setState] = useState({
    tweets: [
      "test",
      "test"
    ]
  })

  const changeTweetsInState = (newtweets) => setState( {
    ...state,
    tweets: newtweets
  })

  return (
    <div className="App">
      <header className="App-header">
        <img className="logo" src={ require('./images/AAMarkov.jpg') } alt="logo" />
        <UserForm changeTweetsInState={changeTweetsInState} />
      </header>
      <TweetDisplayArea tweets = {state.tweets} />
    </div>
  );
}



export default App;
