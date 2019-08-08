import React from 'react';
import './main.css';

const MainContainer = (props) => {
  console.log("bepis", props.currentUserId, props.users, props.items)
  return (
    <div className="MainContainer">
      <p>hullo</p>
    </div>
  )
}

export default MainContainer;
