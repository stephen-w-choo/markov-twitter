import FadeIn from 'react-fade-in';
import { Card, Heading, Flex } from "@chakra-ui/react";

function TweetDisplayArea(props) {
  return (
    <div>
      { props.tweets.length > 0 &&
      <Card m={"20px auto"} p={3} maxW={"500px"} justifyContent="center">
        <Heading size="md" textAlign={"center"}>
          Generated Tweets
        </Heading>
        <FadeIn className="tweet-display-area">
          <Flex flexDir="column" alignItems={"center"}>
            {props.tweets.map( (tweet, index) => {
              return <TweetBox userModel={props.userModel} tweet={tweet} key={index}/>
            })}
          </Flex>
        </FadeIn>
      </Card>
    }
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
