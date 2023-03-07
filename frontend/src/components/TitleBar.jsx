import React from "react";
import { Box, Button, Flex, Spacer, Link, Icon, Text } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";

function TitleBar(props) {
  return (
    <div>
      <Box backgroundColor={"#61777f"}>
        <Flex maxW={"100ch"} margin={"0 auto"} justifyContent={"space-between"} alignItems={"center"}>
          <Link href="/">
            <img className="logo" src={require("../images/logo.png")} alt="logo"/>
          </Link>

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
