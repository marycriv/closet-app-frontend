import React from 'react';

import {Link} from 'react-router-dom';

import { connect } from 'react-redux';
import {withRouter} from "react-router-dom";

class FollowsContainer extends React.Component{

  render(){

    const path = this.props.path

    const notUser = this.props.users.filter(user => user.username === this.props.path)[0]

    const match = this.props.user === notUser

    let followers = []
    let followees = []

    let checkMatch = (match) => {

      if (match) {
        followers = this.props.follows.filter(user => user.followee_id === this.props.currentUserId).map(follow => follow.follower)

        followees = this.props.follows.filter(user => user.follower_id === this.props.currentUserId).map(follow => follow.followee)

      } else {
        followers = this.props.follows.filter(user => user.followee_id === notUser.id).map(follow => follow.follower)

        followees = this.props.follows.filter(user => user.follower_id === notUser.id).map(follow => follow.followee)
      }
    }

    checkMatch(match)


    return(
      <div className="FollowsContainer">
        {this.props.followersToggle ? <div><h3>Followers:</h3>{followers.map(follower => <div className="SingleFollow" onClick={() => this.props.history.push(follower.username)}><img width="100px" src={follower.profile_picture}/><h1>{follower.username}</h1></div>)}</div> : null}

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

export default withRouter(connect(msp, mdp)(FollowsContainer));
