import UserForm from "./UserForm";
import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  StackDivider,
  Text
} from "@chakra-ui/react";

function StartScreen(props) {
  return (
    <CardBody>
      <Stack divider={<StackDivider />} spacing='9'>
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
            <Image src={ require('../images/icons/arrow-up.png') } alt="arrow-down" h={"20px"} m="0px 15px 0px 15px" />
            <Text pt='2' fontSize='md'>
              You can adjust the number of tweets used to train the model - the more
              tweets, the more accurate the model, but the longer it will take to generate.
            </Text>
          </Flex>
        </Box>
        <Box m={"0 auto"}><props.ImportJsonButton /></Box>
      </Stack>
    </CardBody>
  )
}

export default StartScreen;
