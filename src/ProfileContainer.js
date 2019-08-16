import React from 'react';

import { connect } from 'react-redux';

import './main.css'

import ItemCard from './ItemCard';

import ItemForm from './ItemForm';

import OutfitsContainer from './OutfitsContainer';

const ProfileContainer = (props) => {
  return (
    <div className="ProfileContainer">
      <div>
        <h3>New item form:</h3>
        <br/>
        <ItemForm universalPostFunction={props.universalPostFunction}
        universalPatchFunction={props.universalPatchFunction}
        />
      </div>
      <ItemCard universalPatchFunction={props.universalPatchFunction}
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
