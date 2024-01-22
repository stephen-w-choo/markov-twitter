import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from './components/LoadingBar';
import ObamaModel from './mockData/BarackObamaRecreatedModel.json';

const Splash = lazy(() => import("./routes/Splash"));
const MarkovApp = lazy(() => import("./routes/MarkovApp"));
const DemoApp = lazy(() => import("./routes/DemoApp"));
// const ObamaModel = lazy(() => import("./mockData/BarackObamaRecreatedModel.json"));

function AppRoutes() {
  console.log(ObamaModel)
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
          <Route path="/demo" element={<DemoApp demoModel={ObamaModel} />} />
        </Routes>
      </Suspense>
    </Router>

  )
}

export default AppRoutes;
