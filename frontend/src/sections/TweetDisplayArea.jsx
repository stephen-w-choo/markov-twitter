import FadeIn from 'react-fade-in';
import { Button, Card, Heading, Flex, Spacer } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fab)

function TweetDisplayArea(props) {
  console.log("tweets loaded")
  return (
    <div>
      { props.tweets.length > 0 &&
      <Card m={"20px auto"} p={3} maxW={"500px"} justifyContent="center">
        <Heading size="md" textAlign={"center"}>
          Generated Tweets
        </Heading>
        <Button onClick={props.generateTweets} colorScheme="teal" m={2} alignSelf="center">
          <FontAwesomeIcon icon={['fab', 'twitter']} /><Spacer mr="1" />Generate More Tweets
        </Button>
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
