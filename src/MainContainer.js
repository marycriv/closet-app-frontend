import React from 'react';
import './main.css';

import ProfileContainer from './ProfileContainer'

import { connect } from 'react-redux';

const MainContainer = (props) => {

  return (
    <div className="MainContainer">
    {!props.loggedIn ? null :
        <ProfileContainer universalPostFunction={props.universalPostFunction} universalPatchFunction={props.universalPatchFunction} universalDeleteFunction={props.universalDeleteFunction} />}
    </div>
  )
}

function msp(state){
  return {
    currentUserId: state.currentUserId,
    users: state.users,
    user: state.user,
    loggedIn: state.loggedIn
  }
}

function mdp(dispatch){
  return {
  }
}

export default connect(msp, mdp)(MainContainer);
