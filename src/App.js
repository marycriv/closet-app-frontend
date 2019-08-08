import React from 'react';
import logo from './logo.svg';
import './App.css';
import TopBar from './header/TopBar'
import MainContainer from './main/MainContainer'

function App() {
  return (
    <div className="App">
      <TopBar />
      <MainContainer />
    </div>
  );
}

export default App;
