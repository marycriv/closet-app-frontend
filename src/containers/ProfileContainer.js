import React from 'react';

import { connect } from 'react-redux';

import './../main.css'

import ItemCard from './../components/ItemCard';

import ItemForm from './../components/ItemForm';

import OutfitsContainer from './OutfitsContainer';

const ProfileContainer = (props) => {
  return (
    <div className="ProfileContainer">
      <ItemCard
      path={props.path} universalPatchFunction={props.universalPatchFunction}
      universalPostFunction={props.universalPostFunction} universalDeleteFunction={props.universalDeleteFunction} />
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
