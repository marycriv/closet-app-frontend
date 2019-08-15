import React from 'react';
import './main.css';
import UserHeader from './UserHeader'

import ProfileContainer from './ProfileContainer'

import { connect } from 'react-redux';

const MainContainer = (props) => {

  return (
    <div className="MainContainer">
    {!props.loggedIn ? null :
      <div>
        <UserHeader
        universalPostFunction={props.universalPostFunction} universalPatchFunction={props.universalPatchFunction} universalDeleteFunction={props.universalDeleteFunction}
        />
        <ProfileContainer universalPostFunction={props.universalPostFunction} universalPatchFunction={props.universalPatchFunction} universalDeleteFunction={props.universalDeleteFunction} />
        </div>
      }
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
