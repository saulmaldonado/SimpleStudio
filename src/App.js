import React from 'react';
import './App.css';
import GuestLanding from './Components/GuestLanding/GuestLanding'
import TopBar from './Components/TopBar/TopBar'

function App() {
  return (
    <div className="App">
      <TopBar />
      <GuestLanding /> 
    </div>
  );
}

export default App;
