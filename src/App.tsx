import React from 'react';
import './App.css';
import useGeoLocation from './hooks/useGeoLocation';
import { Home } from './pages/Home';

function App() {
  const myLocation = useGeoLocation();

  return (
    <div className="flex justify-center w-full py-6">
      {myLocation.loaded && <Home location={myLocation} />}
    </div>
  );
}

export default App;
