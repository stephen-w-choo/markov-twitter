import React from "react";
import { Box } from "@chakra-ui/react";

function TitleBar(props) {
  return (
    <div>
      <Box backgroundColor={"#61777f"}>
        <img className="logo" src={require("../images/logo.png")} alt="logo"/>
      </Box>
    </div>
  );
}

export default TitleBar;
