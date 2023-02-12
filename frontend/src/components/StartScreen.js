import UserForm from "./UserForm";
import { Box, Card, CardBody, Flex, Heading, Image, Stack, StackDivider, Text } from "@chakra-ui/react";

function StartScreen(props) {
  return (
    <div className="start-screen">
      <Card p='5'>
        <CardBody>
          <Stack divider={<StackDivider />} spacing='9'>
            <Box>
              <Heading fontSize={"xl"}>
                Make your own simple language models - and use them to generate tweets!
                Powered by Markovify.
              </Heading>
            </Box>
            <Box>
              <Flex direction='row' spacing='3' alignItems={"center"} justifyContent={"center"} maxW={"50ch"} margin={"0 auto"}>
                <Image src={ require('../images/icons/arrow-down.png') } alt="arrow-down" h={"20px"} m="20px 15px 0px 15px" />
                <Text pt='2' fontSize='md'>
                  Choose a twitter user to train the model on.
                </Text>
              </Flex>
              <UserForm
                userModel = {props.userModel}
                setUserModel={props.setUserModel}
                resetTweets={props.resetTweets}
                status={props.status}
                setStatus={props.setStatus}
                generateTweets={props.generateTweets}
                primaryColor={props.primaryColor}
              />
              <Flex direction='row' spacing='3' justifyContent={"center"} maxW={"50ch"} margin={"20px auto"}>
                <Image src={ require('../images/icons/arrow-up-diagonal.png') } alt="arrow-down" h={"30px"} m="0px 15px 0px 15px" />
                <Text pt='2' fontSize='md'>
                  You can adjust the number of tweets used to train the model - the more
                  tweets, the more accurate the model, but the longer it will take to generate.
                </Text>
              </Flex>
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
