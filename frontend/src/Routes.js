import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


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
        <div
          style={{display: "flex", justifyContent:"center", textAlign: "center"}}
        >
          Loading app...
          </div>
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
