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


  const twitterNumber = (number) => {
    // takes a number and returns a string in the format "X.XXm" or "X.XXk"
    // depending on the size of the number
    if (number >= 1000000) {
      return `${(number/1000000).toFixed(2)}m`
    } else if (number >= 1000) {
      return `${(number/1000).toFixed(2)}k`
    } else {
      return number
    }
  }

  return (
    <div className="model-display-area">
      <Card
        overflow='hidden'
        variant='outline'
        p='3'
      >
        <Flex justifyContent={"center"} alignItems={"center"}>
          <Image
            objectFit='cover'
            borderRadius={'md'}
            h='120px'
            w='120px'
            src={props.userModel.userProfilePicture}
          />
          <Box w={"100%"} maxW="40ch" pl="3">
            <Heading size='sm' m="5px 15px">{props.userModel.user}</Heading>
            <Heading size='sm' m="5px 15px"color='blackAlpha.600'>
              {`@${props.userModel.userHandle}`}
            </Heading>
            <Text fontSize='sm' m="5px 15px">Joined {props.userModel.userJoined}</Text>
            <StatGroup justifyContent={"space-between"} maxW={"30ch"} textAlign={"center"}>
              <Stat colorScheme={"twitter"} maxW={"10ch"}>
                <StatNumber fontSize="sm">
                  {twitterNumber(props.userModel.userMetrics.tweet_count)}
                </StatNumber>
                <StatHelpText>
                  tweets
                </StatHelpText>
              </Stat>
              <Stat colorScheme={"twitter"} maxW={"10ch"}>
                <StatNumber fontSize="sm">
                  {twitterNumber(props.userModel.userMetrics.following_count)}
                </StatNumber>
                <StatHelpText>
                  following
                </StatHelpText>
              </Stat>
              <Stat colorScheme={"twitter"} maxW={"10ch"}>
                <StatNumber fontSize="sm">
                  {twitterNumber(props.userModel.userMetrics.followers_count)}
                </StatNumber>
                <StatHelpText>
                  followers
                </StatHelpText>
              </Stat>
            </StatGroup>
          </Box>
        </Flex>
        <CardHeader>
          <Heading size='md' textAlign={"center"}>Model Details</Heading>
        </CardHeader>
        <StatGroup textAlign={"center"}>
          <Stat>
            <StatLabel>Trained on</StatLabel>
            <StatNumber><CountUp end={props.userModel.modelSize.tweets} duration={1.5}/></StatNumber>
            <StatHelpText>
              tweets
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>with</StatLabel>
            <StatNumber><CountUp end={props.userModel.modelSize.words} duration={2}/></StatNumber>
            <StatHelpText>
              words
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>
              Tweet Date Range
            </StatLabel>
            <StatNumber fontSize="sm">
              {props.userModel.modelDate[0]}
            </StatNumber>
            <StatHelpText mb={"0"}>
              to
            </StatHelpText>
            <StatNumber fontSize="sm">
              {props.userModel.modelDate[1]}
            </StatNumber>
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
