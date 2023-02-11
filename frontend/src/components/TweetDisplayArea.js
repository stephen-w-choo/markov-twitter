import FadeIn from 'react-fade-in';

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

export default TweetDisplayArea;