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

    return (
      <div>
      <h4>Reccomended for you:</h4>
      {this.props.path !== this.props.user.username ? null : <div className="SuggestedFollowContainer">{otherUsers.map(user => <div onClick={this.handleClick} id={user.id} className="SuggestedFollow"> <h3 id={user.id} className="SuggestedFollowText">+ {user.username}</h3><img id={user.id} width="75px" className="SuggestedFollowImage" src={user.profile_picture} /></div>)}</div>}
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
