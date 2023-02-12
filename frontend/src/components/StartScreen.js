import UserForm from "./UserForm";
import { Box, Card, CardBody, Stack, StackDivider, Text } from "@chakra-ui/react";

function StartScreen(props) {
  return (
    <div className="start-screen">
      <Card p='5'>
        <CardBody>
          <Stack divider={<StackDivider />} spacing='9'>
            <Box>
              <Text pt='2' fontSize='md'>
                Type in a Twitter handle to generate random semi-plausible tweets, based on the user's past tweets.
              </Text>
              <Text pt='2' fontSize='md'>
                You can adjust the number of tweets used to train the model - the more
                tweets, the more accurate the model, but the longer it will take to generate.
              </Text>
            </Box>
            <Box>
              <UserForm
                userModel = {props.userModel}
                setUserModel={props.setUserModel}
                resetTweets={props.resetTweets}
                status={props.status}
                setStatus={props.setStatus}
                generateTweets={props.generateTweets}
              />
            </Box>
            <Box>
              <Text pt='2' fontSize='md'>
                About
              </Text>
              <Text pt='2' fontSize='md'>
                This app uses a Markov chain to generate tweets based on a user's past tweets.
                The Markov chain is trained on the user's past tweets, and then used to generate new tweets.
                Markov chains are a type of stochastic process that generates a sequence of random events based on the probability of each event.
              </Text>
              <Text pt='2' fontSize='md'>
                Made using jsvine's Markovify library.
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </div>
  )
}

export default StartScreen;
