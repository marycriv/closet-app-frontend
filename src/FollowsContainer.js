import React from 'react';

import {Link} from 'react-router-dom';

import { connect } from 'react-redux';

class FollowsContainer extends React.Component{

  render(){
    let followers = this.props.follows.filter(user => user.followee_id === this.props.currentUserId).map(follow => follow.follower)

    let followees = this.props.follows.filter(user => user.follower_id === this.props.currentUserId).map(follow => follow.followee)

    return(
      <div className="FollowsContainer">
        {this.props.followersToggle ? <div><h3>Followers:</h3>{followers.map(follower => <div className="SingleFollow"><Link to={`/${follower.username}`}><img width="100px" src={follower.profile_picture}/></Link><h1>{follower.username}</h1></div>)}</div> : null}

        {this.props.followingToggle ? <div><h3>Following:</h3>{followees.map(followee => <div className="SingleFollow"><Link to={`/${followee.username}`}><img width="100px" src={followee.profile_picture}/></Link><h1>{followee.username}</h1></div>)}</div> : null}
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
