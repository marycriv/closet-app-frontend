import React from 'react';

import { connect } from 'react-redux';

import ItemCard from './ItemCard';

import UserData from './UserData';

const ProfileContainer = (props) => {
  return (
    <div className="ProfileContainer">
      <UserData />
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

export default connect(msp, mdp)(ProfileContainer);
