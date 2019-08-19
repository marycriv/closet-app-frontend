import React from 'react';
import './main.css';
import UserHeader from './UserHeader'
import OutfitBuilder from './OutfitBuilder'

import ProfileContainer from './ProfileContainer'

import OutfitsContainer from './OutfitsContainer';

import FollowsContainer from './FollowsContainer';

import {BrowserRouter} from 'react-router-dom'

import { connect } from 'react-redux';

class MainContainer extends React.Component {

  state = {
    items: true,
    outfits: false,
    followers: false,
    following: false
  }

  handleClick = (e, button) => {
    switch(button){
    case "items":
      this.setState({
        items: true,
        outfits: false,
        followers: false,
        following: false
      })
      break
    case "outfits":
      this.setState({
        items: false,
        outfits: true,
        followers: false,
        following: false
      })
      break
    case "followers":
      this.setState({
        items: false,
        outfits: false,
        followers: true,
        following: false
      })
      break
    case "following":
      this.setState({
        items: false,
        outfits: false,
        followers: false,
        following: true
      })
      break
    default:
      return null
    }
  }


  render(){
    const path = window.location.pathname.substring(1);

    return (
      <div className="MainContainer">

      {!this.props.loggedIn ? null :
        <div>
          <UserHeader
          path={path}
          universalPostFunction={this.props.universalPostFunction} universalPatchFunction={this.props.universalPatchFunction} universalDeleteFunction={this.props.universalDeleteFunction}
          />

          <div className="ProfileNavButtons">
            <button onClick={(e) => this.handleClick(e, 'items')} className="ProfileNavButton">Closet</button>
            <button onClick={(e) => this.handleClick(e, 'outfits')} className="ProfileNavButton">Outfits</button>
            <button onClick={(e) => this.handleClick(e, 'followers')} className="ProfileNavButton">Followers</button>
            <button onClick={(e) => this.handleClick(e, 'following')} className="ProfileNavButton">Following</button>
            <button onClick={console.log("bepis")} className="NewOutfitButton">New Outfit!!!!</button>
          </div>

          {!this.state.items ? null : <ProfileContainer
            path={path} universalPostFunction={this.props.universalPostFunction} universalPatchFunction={this.props.universalPatchFunction} universalDeleteFunction={this.props.universalDeleteFunction} />}

          {!this.state.outfits ? null : <OutfitsContainer
            path={path} universalPostFunction={this.props.universalPostFunction} universalPatchFunction={this.props.universalPatchFunction} universalDeleteFunction={this.props.universalDeleteFunction} />}
          {!this.state.followers ? null : <FollowsContainer
            path={path} followersToggle={this.state.followers} />}
          {!this.state.following ? null : <FollowsContainer
            path={path} followingToggle={this.state.following} />}

          </div>
        }
      </div>
    )
  }
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
