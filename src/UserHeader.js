import React from 'react';
import UserData from './UserData';
import FollowSuggestions from './FollowSuggestions'

import { connect } from 'react-redux';

// may be extraneous

class UserHeader extends React.Component{
  render(){

    return (
      <div>
      <FollowSuggestions
        path={this.props.path} universalPostFunction={this.props.universalPostFunction}
      />
        <UserData
          path={this.props.path}
          universalDeleteFunction={this.props.universalDeleteFunction} universalPatchFunction={this.props.universalPatchFunction}
         />
      </div>
    )
  }
}

function msp(state){
  return {
    loggedIn: state.loggedIn,
    currentUserId: state.currentUserId,
    users: state.users,
    items: state.items,
    follows: state.follows
  }
}

function mdp(dispatch){
  return {

  }
}

export default connect(msp, mdp)(UserHeader)
