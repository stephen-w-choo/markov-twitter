import React from "react";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Icon,
  Image,
  Link as ChakraLink,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/react'
import languageModelImage from '../images/languagemodel.png';
import generatedTweetsImage from '../images/generatedtweets.png';
import FancyUnderline from "../components/FancyUnderline";
import FlexWrapChild from "../components/FlexWrapChild";

import { FaGithub, FaLinkedin } from "react-icons/fa";

import { Link } from "react-router-dom";
import InactivePopUp from "../sections/InactivePopUp";

function Splash(){

  return (
    <React.Fragment>
      <InactivePopUp />
      <Card p={5} pb="40px" mb={3}>
        
        <Stack spacing='7' alignItems="center">
          <Heading size="2xl" textAlign="center" pt={7} m={3} maxW="50ch">
            Make your own <FancyUnderline as="h2" fontSize="2xl" colour="#61777F">language models</FancyUnderline> from tweets
          </Heading>
          <StackDivider />
          <Box maxW="50ch">
            <Text fontSize="lg" textAlign="center" mb={3} >
              Choose a twitter user and analyse their tweets.
            </Text>
            <Text fontSize="lg" textAlign="center" >
              Get metrics and analysis of the tweets and generate new tweets in the same style.
            </Text>
          </Box>
          <Link to={"markov"}>
            <Button colorScheme="teal" p={4}>
              <Heading size="md">Make a language model</Heading>
            </Button>
          </Link>
          <Link to={"demo"}>
            <Button colorScheme="teal" p={4}>
              <Heading size="md">View demo</Heading>
            </Button>
          </Link>
          <StackDivider />
          <Card
            shadow={"dark-lg"}
            p={4}
            m={2}
          >
            <Heading fontSize="xl" textAlign="center" >Features</Heading>
            <Flex justifyContent={"space-around"} flexWrap="wrap">
              <FlexWrapChild>
                <Heading fontSize="md" textAlign="center" m={2}>
                  Models and analytics
                </Heading>
                <Image src={languageModelImage}/>
              </FlexWrapChild>
              <FlexWrapChild>
                <Heading fontSize="md" textAlign="center" m={2}>
                  Tweet generation
                </Heading>
                <Image src={generatedTweetsImage}/>
              </FlexWrapChild>
            </Flex>
          </Card>
          <StackDivider />
          <Box maxW="60ch">
            <Heading size="md" m={2} p={0}>About</Heading>
            <Text m={2}>
              This app does not use ChatGPT or other generative AI - it uses a much
              simpler, older, and more primitive approach, based on Markov chains.
            </Text>
            <Text m={2}>
              It is not meant for impersonating users, and is nowhere near accurate enough
              to be used for that purpose - it is just a fun way to play around with
              language models.
            </Text>
          </Box>
          <StackDivider borderBottomStyle="solid" borderBottomColor="teal" borderBottomWidth={1} />
          <Flex justifyContent={"space-between"} width="100%">
            <Text ml={3} mr={3}>Powered by Markovify and the Twitter API</Text>
            <Box ml={3} mr={3}>
              <ChakraLink href="https://github.com/stephen-w-choo/" >
                <Icon as={FaGithub} m={1}/>
              </ChakraLink>
              <ChakraLink href="https://www.linkedin.com/in/stephen-choo-b130b3238/">
                <Icon as={FaLinkedin} m={1}/>
              </ChakraLink>
            </Box>
          </Flex>
        </Stack>
      </Card>
    </React.Fragment>
  );
}

export default Splash;
