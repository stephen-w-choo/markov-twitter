import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from './components/LoadingBar';


const Splash = lazy(() => import("./routes/Splash"));
const MarkovApp = lazy(() => import("./routes/MarkovApp"));

function AppRoutes() {
  return (
    <Router>
      <Suspense
      fallback={
        <LoadingBar>Loading app...</LoadingBar>
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
