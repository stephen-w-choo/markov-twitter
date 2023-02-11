import React from "react";
import CountUp from 'react-countup';

function GenerateTweetsButton(props) {
  return(
    <button
      onClick={props.generateTweets}> Generate More Tweets
    </button>
  )
}

function BackButton(props) {
  return(
    <button
      onClick={props.reset}> Back
    </button>
  )
}

function ModelDisplayArea(props) {
  // takes a response from the markovify_user api and displays the user details and background of the tweets
  // has a button to generate tweets from the model
  // props needs to include:
  // changeTweets function
  // api_response json object
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
      <BackButton reset={props.reset}/>
    </div>
  )
}

export default ModelDisplayArea;
