import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Alert, Box, Spinner } from '@chakra-ui/react';


const Splash = lazy(() => import("./routes/Splash"));
const MarkovApp = lazy(() => import("./routes/MarkovApp"));

function AppRoutes() {
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Splash />,
  //   },
  //   {
  //     path: "/markov",
  //     element: <MarkovApp />,
  //   },
  // ])


  return (
    <Router>
      <Suspense
      fallback={
        <Alert
          status='info'
          variant='subtle'
          alignItems='center'
          textAlign={'left'}
          justifyContent={'center'}
          flexWrap={'wrap'}
          p={4}
          >
            <Spinner
              as="span"
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='lg'
              m={4}
            />
            <Box>Loading app...</Box>
          </Alert>
        }
      >
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/markov" element={<MarkovApp />} />
        </Routes>
      </Suspense>
    </Router>

  )
}

export default AppRoutes;
