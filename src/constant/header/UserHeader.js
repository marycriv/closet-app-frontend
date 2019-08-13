import React from 'react';

import { connect } from 'react-redux';

class UserHeader extends React.Component{
  render(){
    let followees = this.props.follows.filter(user => user.follower_id === this.props.currentUserId).map(follow => follow.followee_id)

    let followers = this.props.follows.filter(user => user.followee_id === this.props.currentUserId).map(follow => follow.follower_id)

    return (
      <div>

        {this.props.users.filter((user) => {return !followees.includes(user.id) && user.id !== this.props.currentUserId}).map(user => <button onClick={() => this.props.universalPostFunction(user.id, "NEW_FOLLOW")}>FOLLOW {user.username}!</button>)}
        <h4>Followers: </h4>
        {followers.map(follower => this.props.users.find(user => user.id === follower)).map(user => <div>{user.username}</div>)}
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
