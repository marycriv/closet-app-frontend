import React from 'react';

import { connect } from 'react-redux';

import ItemCard from './ItemCard';

import UserData from './UserData';
import NewItemForm from './NewItemForm';

const ProfileContainer = (props) => {
  return (
    <div className="ProfileContainer">
      <UserData />
      <NewItemForm postFunction={props.postFunction} />
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
