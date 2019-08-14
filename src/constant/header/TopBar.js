import React from 'react';
import './header.css';
import LoginForm from './LoginForm';
import UserHeader from './UserHeader';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

class TopBar extends React.Component{
  render(){
    return (
      <div className="TopBar">
        <Link to="/">My Closet App</Link>
        {!this.props.loggedIn ? <LoginForm /> : <UserHeader universalPostFunction={this.props.universalPostFunction}
        universalPatchFunction={this.props.universalPatchFunction} universalDeleteFunction={this.props.universalDeleteFunction}
        />}
      </div>
    )
  }
}

function msp(state){
  return {
    loggedIn: state.loggedIn,
    currentUserId: state.currentUserId,
    users: state.users
  }
}

function mdp(dispatch){
  return {

  }
}

export default connect(msp, mdp)(TopBar)
