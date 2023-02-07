import './App.css';
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab)

// function GenerateTweetsButton(props) {
//   // takes a response from the markovify_user api and displays the user details and background of the tweets
//   // has a button to generate tweets from the model
//   // props needs to include:
//   // changeTweets function
//   // api_response json object

//   const generateTweets = (event) => {
//     event.preventDefault();
//     props.changeTweets({
//       tweets: ["Markovifying and generating tweets..."],
//     })
//     fetch("/generate_tweets", {
//       method: 'POST', // *GET, POST, PUT, DELETE, etc.
//       body: props.api_response
//     })
//     .then(response => response.json())
//     .then( (response) => {
//       console.log(response)
//       props.changeTweets(response)
//     })
//     .catch( (error) => {
//       props.changeTweets({
//         tweets: ["Error - user was not found. Remember to type in your user handle without the @ \neg type BarackObama instead of @BarackObama"],
//       })
//     })
//   }

//   return(
//     <button
//       onClick={generateTweets}></button>
//   )
// }





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
    props.changeTweets({
      tweets: ["Collecting tweets and generating model"],
    })

    fetch(`/markovify_user?username=${query.username}`)
    .then(response => response.json())
    .then( (response) => {
      console.log(response)
      props.setUser(response)
      props.resetTweets()
    })
    .catch( (error) => {
      props.changeTweets({
        tweets: ["Error - user was not found. Remember to type in your user handle without the @ \neg type BarackObama instead of @BarackObama"],
      })
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
  console.log(props)
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
      {props.state.tweets.map( (tweet) => {
        return <TweetBox state={props.state} tweet={tweet}/>
      })}
    </div>
  )
}

function ModelDisplayArea(props) {
  return (
    <div className="model-display-area">
      <p> {props.state.user} </p>
      <img src={props.state.userProfilePicture} alt = "" ></img>
    </div>
  )
}

function App() {
  const [state, setState] = useState({
    user: null,
    userHandle: null,
    userProfilePicture: null,
    currentModel: null, // unsure - storing the markov model in the state is probably a bit much - would be better in the session storage
    tweets: [],
  })

  const setUser = (response) => setState( {
    ...state,
    user: response.name,
    userHandle: response.username,
    userProfilePicture: response.userProfilePicture,
    currentModel: response.currentModel,
  })

  const changeTweets = (response) => setState( {
    ...state,
    tweets: response.tweets,
  })

  const resetTweets = () => setState( {
    ...state,
    tweets: [],
  })



  return (
    <div className="App">
      <header className="App-header">
        <h1>Twitter Caricatures</h1>
        <img className="logo" src={ require('./images/AAMarkov.jpg') } alt="logo" />
        <h6>Andrey Markov</h6>
        <br></br>
        <p> Enter a twitter username to generate random semi-plausible new tweets for the given user. </p>
        <p> The random tweets are generated from a Markov model based on the user's existing tweets. </p>
        <p> Made using jsvine's Markovify library. </p>
        <br></br>
        <UserForm
          setUser={setUser}
          resetTweets={resetTweets}
          changeTweets={changeTweets}
          />
        <TweetDisplayArea state = {state} />
        {
          state.user && <ModelDisplayArea state={state} /> // display the model if the user has been set
        }

      </header>
    </div>
  );
}

export default App;
