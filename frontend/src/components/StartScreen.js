import UserForm from "./UserForm";
import { Box, Card, CardBody, Stack, StackDivider, Text } from "@chakra-ui/react";

function StartScreen(props) {
  return (
    <div className="start-screen">
      <Card>
        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            <Box>
              <Text pt='2' fontSize='sm'>
                Enter a twitter username to generate random semi-plausible new tweets for the given user.
              </Text>
              <Text pt='2' fontSize='sm'>
                Made using jsvine's Markovify library.
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
          </Stack>
        </CardBody>
      </Card>
    </div>
  )
}

export default StartScreen;
