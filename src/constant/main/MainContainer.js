import React from 'react';
import './main.css';

import { connect } from 'react-redux';

import ItemCard from './../../profile/ItemCard';

const MainContainer = (props) => {

  const user = props.users.find(user => user.id === props.currentUserId)

  return (
    <div className="MainContainer">
      <p>Main Container</p>
      <h2>{user.username}</h2>
      <ItemCard />
    </div>
  )
}

function msp(state){
  return {
    currentUserId: state.currentUserId,
    users: state.users
  }
}

function mdp(dispatch){
  return {
  }
}

export default connect(msp, mdp)(MainContainer);
