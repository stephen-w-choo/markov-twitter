import './css/App.css';
import './css/model.css';
import './css/tweet.css';
import './css/fonts.css';
import React from "react";
import { Box, ChakraProvider, Container } from '@chakra-ui/react'
import TitleBar from './components/TitleBar';
import Routes from './Routes';


// this file WILL eventually be refactored
// I sincerely apologise for this mess


function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <header className="App-header">
          <TitleBar logoSrc={require('./images/logo.png')} title="Markov Tweet Generator"/>
          <Box h="20px" />
          <Container maxW="100ch" p={0}>
            <Routes />
          </Container>
        </header>
      </div>
    </ChakraProvider>
  );
}

export default App;
