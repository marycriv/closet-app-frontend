import React from 'react';

import { connect } from 'react-redux';

class FollowSuggestions extends React.Component {

  handleClick = (e) => {
    let params = {
        followee_id: e.target.id
    }
    this.props.universalPostFunction(params, "NEW_FOLLOW")
  }

  render(){

    let followees = this.props.follows.filter(user => user.follower_id === this.props.currentUserId).map(follow => follow.followee.username)

    let otherUsers = this.props.users.filter(user => user.id !== this.props.currentUserId && !followees.includes(user.username)).slice(0,4)

    console.log(otherUsers)

    return (
      <div>
      {this.props.path !== this.props.user.username ? null : <div>{otherUsers.map(user => <p onClick={this.handleClick} id={user.id}>+ {user.username}</p>)}</div>}
      </div>
    )
  }
}

function msp(state){
  return {
    loggedIn: state.loggedIn,
    currentUserId: state.currentUserId,
    users: state.users,
    user: state.user,
    items: state.items,
    follows: state.follows
  }
}

function mdp(dispatch){
  return {

  }
}

export default connect(msp, mdp)(FollowSuggestions);
