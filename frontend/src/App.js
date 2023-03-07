import './css/App.css';
import './css/model.css';
import './css/tweet.css';
import React from "react";
import { Card, ChakraProvider, Container } from '@chakra-ui/react'
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
          <Container maxW="100ch" pt={2} >
            <Card p={2} pb="40px" mb={3}>
              <Routes />
            </Card>
          </Container>
        </header>
      </div>
    </ChakraProvider>
  );
}

export default App;
