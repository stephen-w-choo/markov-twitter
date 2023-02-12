import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { Button, Flex, Heading, Input } from "@chakra-ui/react";
import TweetSlider from "./TweetSlider"

library.add(fab)

function UserForm(props) {
  const defaultTweetN = 600

  const [query, setQuery] = useState({
    username: ""
  })

  const [tweetN, setTweetN] = useState(defaultTweetN)

  const handleChange = (event) => {
    setQuery({
      ...query,
      username: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.setStatus({
      loading: true,
      message: ("Collecting tweets and generating model")
    })
    fetch(
      `http://localhost:5000/markovify_user?username=${query.username}&tweetN=${tweetN}`,
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
        loading: false,
        message: null
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
        message: ("Error - user was not found. Remember to type in your user handle without the @ \neg type BarackObama instead of @BarackObama")
      })
    })
  }

  return (
    <div>
      <form onSubmit = {handleSubmit}>
        <Heading textAlign={'center'}>Enter a twitter username</Heading>
        <Flex
          justifyContent={'space-between'}
          flexWrap={'wrap'}
          >
          <Input
            type = "text"
            id = "search-input"
            name = "username"
            placeholder = "username eg BarackObama, AlboMP"
            value = {query.username}
            onChange = {handleChange}
            margin={'10px auto'}
          />
          <Button
            onClick={handleSubmit}
            isLoading={props.status.loading}
            colorScheme={'blue'}
            margin={'10px auto'}
          >
            <FontAwesomeIcon icon={['fab', 'twitter']} /> Generate tweets
          </Button>
        </Flex>
      </form>
      <TweetSlider tweetN={tweetN} setTweetN={setTweetN} defaultTweetN={defaultTweetN}/>
    </div>
  )
}

export default UserForm;
