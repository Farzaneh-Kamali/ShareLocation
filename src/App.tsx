import React from 'react';
import './App.css';
import useGeoLocation from './hooks/useGeoLocation';
import { Home } from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import { Details } from './pages/Details';

function App() {
  const myLocation = useGeoLocation();

  return (
    <div className="flex justify-center w-full py-6">
      <Routes>
        <Route
          path="/"
          element={myLocation.loaded && <Home location={myLocation} />}
        />
        <Route
          path="details"
          // path="details/:name/:lat/:lng/:type/:logo"
          element={<Details />}
        />
      </Routes>
    </div>
  );
}

export default App;
