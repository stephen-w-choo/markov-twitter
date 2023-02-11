import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { Button, Input } from "@chakra-ui/react"

library.add(fab)

function UserForm(props) {
  const [query, setQuery] = useState({
    username: ""
  })

  const handleChange = (event) => {
    setQuery({
      ...query,
      username: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(query)
    props.setStatus({
      loading: true,
      message: ("Collecting tweets and generating model")
    })
    fetch(
      `http://localhost:5000/markovify_user?username=${query.username}`,
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
        <h3>Enter a twitter username</h3>
        <Input
          type = "text"
          id = "search-input"
          name = "username"
          placeholder = "username eg BarackObama, AlboMP"
          value = {query.username}
          onChange = {handleChange}
        />
        <Button onClick={handleSubmit} isLoading={props.status.loading} colorScheme={'blue'}> <FontAwesomeIcon icon={['fab', 'twitter']} /> Generate tweets </Button>
      </form>
    </div>
  )
}

export default UserForm;
