import React from "react";
import { Box, Button, Flex, Link, Icon, Image, Text, Heading } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import Logo from "../images/logo.png";

function TitleBar(props) {
  return (
    <div>
      <Box backgroundColor={"#61777f"}>
        <Flex maxW={"100ch"} margin={"0 auto"} justifyContent={"space-between"} alignItems={"center"}>
          <Flex alignItems="center">
            <Link href="/">
              <Image src={Logo} h="80px" display={"inline-block"}/>
            </Link>
            <Box
              display="inline-block"
            >
              <Heading color="whiteAlpha.800" letterSpacing={"tight"} fontFamily={"Montserrat"} mb={-2}>
                Markov
              </Heading>
              <Heading color="whiteAlpha.800" letterSpacing={"tight"} fontFamily={"Montserrat"} ml={"2px"} mt={-2}>
                Twitter
              </Heading>
            </Box>
          </Flex>

          <Link href="https://github.com/stephen-w-choo/markov-twitter" m={3}>
            <Button colorScheme={"teal"}>
              <Icon as={FaGithub} mr={3} display="block" />
              <Text>Source</Text>
            </Button>
          </Link>
        </Flex>
      </Box>
    </div>
  );
}

export default TitleBar;
