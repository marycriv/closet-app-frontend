import React from 'react';

import { connect } from 'react-redux';

import ItemCard from './ItemCard';

import UserData from './UserData';
import ItemForm from './ItemForm';

import OutfitsContainer from './OutfitsContainer';

const ProfileContainer = (props) => {
  return (
    <div className="ProfileContainer">
      <UserData universalDeleteFunction={props.universalDeleteFunction} universalPatchFunction={props.universalPatchFunction}/>
      <h3>New item form:</h3>
      <ItemForm universalPostFunction={props.universalPostFunction}
      universalPatchFunction={props.universalPatchFunction}
      />
      <ItemCard universalPatchFunction={props.universalPatchFunction} universalDeleteFunction={props.universalDeleteFunction} />
      <OutfitsContainer
      universalPostFunction={props.universalPostFunction}
      universalPatchFunction={props.universalPatchFunction} universalDeleteFunction={props.universalDeleteFunction} />
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
