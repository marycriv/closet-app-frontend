import React from 'react';

import { connect } from 'react-redux';

import ItemCard from './ItemCard';

import UserData from './UserData';
import ItemForm from './ItemForm';

const ProfileContainer = (props) => {
  return (
    <div className="ProfileContainer">
      <UserData />
      <ItemForm postFunction={props.postFunction} />
      <ItemCard patchFunction={props.patchFunction} deleteFunction={props.deleteFunction} />
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
