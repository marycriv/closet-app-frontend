import React from 'react';
import './main.css';


const API = 'http://localhost:3001'

const getUsers = () => {
  fetch(`${API}/users`)
  .then(resp => resp.json())
  .then(console.log)
}

const MainContainer = () => {
  getUsers()
  return (
    <div className="MainContainer">
      <p>hullo</p>
    </div>
  )
}

export default MainContainer;
