import React from "react";
import { Box, Flex, Spacer } from "@chakra-ui/react";

function TitleBar(props) {
  return (
    <div>
      <Box backgroundColor={"#61777f"}>
        <Flex maxW={"100ch"} margin={"0 auto"} justifyContent={"space-between"}>
          <img className="logo" src={require("../images/logo.png")} alt="logo"/>
          <Spacer />
        </Flex>
      </Box>
    </div>
  );
}

export default TitleBar;
