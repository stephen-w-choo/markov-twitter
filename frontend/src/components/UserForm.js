import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputLeftAddon,
  Spacer,
  Text,
  useMediaQuery } from "@chakra-ui/react";
import { AtSignIcon } from '@chakra-ui/icons'
import StatusBox from "./StatusBox";
import TweetSlider from "./TweetSlider"

library.add(fab)

function UserForm(props) {
  const defaultTweetN = 600

  const [query, setQuery] = useState({
    username: ""
  })

  const [tweetN, setTweetN] = useState(defaultTweetN)

  const [isLargerThan600] = useMediaQuery('(min-width: 600px)') // mediaquery hook

  var layout = "column-reverse"
  if (isLargerThan600) {
    layout = "row"
  }

  const handleChange = (event) => {
    setQuery({
      ...query,
      username: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.setStatus({
      loading: true,
      message: ("Collecting tweets and generating model"),
      show: true,
      error: false,
    })
    fetch(
      `/markovify_user?username=${query.username}&tweetN=${tweetN}`,
      {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
      }
    )
    .then( (response) => {
      return response.json()
    })
    .then( (response) => {
      props.setStatus({
        message: null,
        loading: false,
        show: false,
        error: false,
      })
      props.setUserModel({
        user: response.name,
        userHandle: response.username,
        userProfilePicture: response.userProfilePicture,
        userMetrics: response.userMetrics,
        userJoined: response.userJoined,
        currentModel: response.model,
        modelSize: response.modelSize,
        modelDate: response.modelDate,
      })
    })
    .catch( (error) => {
      console.log(error)
      props.setStatus({
        loading: false,
        message: (`Error - user was not found. Remember to type in your user handle without the @ \neg type BarackObama instead of @BarackObama`),
        show: false,
        error: true,
      })
    })
  }

  return (
    <div>
      <Flex flexDir={"column"}>
        <FormControl isInvalid={props.status.error} mt={"-20px"} mb={"-20px"}>
          <InputGroup margin={'30px auto'} maxW={'50ch'}>
            <InputLeftElement
              pointerEvents="none"
              children={
                <AtSignIcon
                  color="gray.800"
                  p={0}
                  h={20}
                />
              }
            />
            <Input
              type = "text"
              id = "search-input"
              variant="filled"
              name = "username"
              placeholder = "eg BarackObama, AlboMP"
              value = {query.username}
              onChange = {handleChange}
              pl={8}
              fontSize={'1.2rem'}
            />

          </InputGroup>
          <FormErrorMessage mt={-4} mb={4}>{props.status.message}</FormErrorMessage>
        </FormControl>
        {
          props.status.show && <StatusBox status={props.status}/>
        }
        { !props.status.show &&
          <Flex
            w={"100%"}
            justifyContent="space-around"
            alignItems="center"
            flexDir={layout}
            mt={3}
          >
            <Box w={"100%"} maxW={"400px"} m={"25px 30px 0px 10px"}>
              <TweetSlider tweetN={tweetN} setTweetN={setTweetN} defaultTweetN={defaultTweetN} primaryColor={props.primaryColor} />
            </Box>
            <Button
              onClick={handleSubmit}
              isLoading={props.status.loading}
              colorScheme={'teal'}
              isDisabled={tweetN === 0}
              m={3}
              maxW={"300px"}
              w={"100%"}
              ml={3}
            >
              <FontAwesomeIcon icon={['fab', 'twitter']} />
              <Text as="span" ml={2}>
              {`Generate model`}
              </Text>
            </Button>
          </Flex>
        }
      </Flex>
    </div>
  )
}

export default UserForm;
