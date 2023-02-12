import React from "react";
import CountUp from 'react-countup';
import {
  Box,
  Card,
  CardHeader,
  Flex,
  Heading,
  Image,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Text
 } from "@chakra-ui/react";

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
    <div className="model-display-area">
      <Card
        overflow='hidden'
        variant='outline'
      >
        <CardHeader>
          <Heading size='md'>Model Details</Heading>
        </CardHeader>
        <Flex >
          <Image
            objectFit='cover'
            h='150px'
            w='150px'
            src={props.userModel.userProfilePicture}
          />
          <Box>
            <Heading size='md'>{props.userModel.user}</Heading>
            <Heading size='sm'>{`@${props.userModel.userHandle}`}</Heading>
            <Text fontSize='sm'>Joined {props.userModel.userJoined}</Text>
            <StatGroup>
              <Stat>
                <StatNumber>
                  {props.userModel.userMetrics.tweet_count}
                </StatNumber>
                <StatHelpText>
                  tweets
                </StatHelpText>
              </Stat>
              <Stat>
                <StatNumber>
                  {props.userModel.userMetrics.following_count}
                </StatNumber>
                <StatHelpText>
                  following
                </StatHelpText>
              </Stat>
              <Stat>
                <StatNumber>
                  {props.userModel.userMetrics.followers_count}
                </StatNumber>
                <StatHelpText>
                  followers
                </StatHelpText>
              </Stat>
            </StatGroup>
          </Box>
        </Flex>
        <StatGroup>
          <Stat>
            <StatLabel>Trained on</StatLabel>
            <StatNumber><CountUp end={props.userModel.modelSize} duration={1}/></StatNumber>
            <StatHelpText>
              tweets
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Tweet Date Range</StatLabel>
            <StatNumber>{props.userModel.modelDate}</StatNumber>
          </Stat>
        </StatGroup>
      </Card>
      <GenerateTweetsButton
      model={props.userModel.currentModel}
      setTweets={props.setTweets}
      generateTweets={props.generateTweets} />
      <BackButton reset={props.reset}/>
    </div>
  )
}

export default ModelDisplayArea;
