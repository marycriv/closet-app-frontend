import React from 'react';
import UserData from './UserData';

import { connect } from 'react-redux';

class UserHeader extends React.Component{
  render(){
    let followees = this.props.follows.filter(user => user.follower_id === this.props.currentUserId).map(follow => follow.followee_id)

    let followers = this.props.follows.filter(user => user.followee_id === this.props.currentUserId).map(follow => follow.follower_id)

    return (
      <div>
        <UserData
          universalDeleteFunction={this.props.universalDeleteFunction} universalPatchFunction={this.props.universalPatchFunction}
         />
         <div className="FollowersBox">
        {this.props.users.filter((user) => {return !followees.includes(user.id) && user.id !== this.props.currentUserId}).map(user =>
            <div className="FollowersItem">
            <img src={user.profile_picture} /><br/>
            <button onClick={() => this.props.universalPostFunction(user.id, "NEW_FOLLOW")}>FOLLOW {user.username}!</button>
            </div>
          )}</div>
        <h4>Followers ({followers.length}): </h4>
        <div className="FollowersBox" style={{border: 'solid hotpink'}}>
          {followers.map(follower => this.props.users.find(user => user.id === follower)).map(user => <div><img src={user.profile_picture} title={user.username}/><h4>{user.username}</h4></div>)}
        </div>
        <h4>Following: </h4>
        <div className="FollowersBox" style={{border: 'solid aquamarine'}}>
          {followees.map(followee => this.props.users.find(user => user.id === followee)).map(user => <div className="FollowersItem"><img title={user.username} src={user.profile_picture}/><h4>{user.username}</h4></div>)}
        </div>
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
