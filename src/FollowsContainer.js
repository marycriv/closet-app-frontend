import React from 'react';

import { connect } from 'react-redux';

class FollowsContainer extends React.Component{

  render(){
    let followerIds = this.props.follows.filter(user => user.followee_id === this.props.currentUserId).map(follow => follow.follower_id)

    let followeeIds = this.props.follows.filter(user => user.follower_id === this.props.currentUserId).map(follow => follow.followee_id)

    let followers = this.props.users.filter(user => followerIds.includes(user.id))

    let followees = this.props.users.filter(user => followeeIds.includes(user.id))


    console.log(followers, followees)

    return(
      <div className="FollowsContainer">
        {this.props.followersToggle ? <div><h3>Followers:</h3>{followers.map(follower => <div className="SingleFollow"><img width="100px" src={follower.profile_picture}/><h1>{follower.username}</h1></div>)}</div> : null}

        {this.props.followingToggle ? <div><h3>Following:</h3>{followees.map(followee => <div className="SingleFollow"><img width="100px" src={followee.profile_picture}/><h1>{followee.username}</h1></div>)}</div> : null}
      </div>
    )
  }
}

function msp(state){
  return {
    currentUserId: state.currentUserId,
    users: state.users,
    user: state.user,
    follows: state.follows,
    loggedIn: state.loggedIn
  }
}

function mdp(dispatch){
  return {
  }
}

export default connect(msp, mdp)(FollowsContainer);
