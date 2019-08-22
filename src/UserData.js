import React from 'react';

import './main.css'

import { connect } from 'react-redux';

import UserForm from './UserForm'

import {withRouter} from "react-router-dom";

class UserData extends React.Component {

  state = {
    toggleEdit: false
  }

render(){
  const user = this.props.user
  //dont change UserData w/o fixing patch
  const path = this.props.path
  const notUser = this.props.users.find(user => user.username === path)
  const match = user === notUser


  return (
    <div className="container">
    <div className="UserHeader">
    { match ?
      <div>
      <div className="CurrentUserHeader">
          <img className="ProfilePicture" width="100px" alt="profile" src={user.profile_picture} />
          <div className="UserBioRight">
            <h1 className="Username">{user.username}</h1>
            <h2 hidden>{user.id}</h2>
            <button class="EditButton" onClick={() => this.props.history.push('/edit')}>Edit</button>
          <div class="ProfileBio">
            <p>{user.bio}</p>
          </div>
        </div>
        </div>
        { /*!this.state.toggleEdit ? null : <div className="UserSettings">
        <p className="UserFormDelete" onClick={(e) => this.props.universalDeleteFunction(user.id, 'users')} ><i class="fa fa-times fa-2x" aria-hidden="true"></i></p>


        <UserForm universalPatchFunction={this.props.universalPatchFunction} /><br/><br/></div>*/}
      </div>
      : <div className="NotCurrentUserBio">
        <img className="ProfilePicture" width="100px" alt="profile" src={notUser.profile_picture} />
        <div className="NotUserBio">
          <div>
            <h1 className="Username">{notUser.username}</h1>
            <h2 hidden>{notUser.id}</h2>
            <button className="EditButton" onClick={() => this.props.universalDeleteFunction(this.props.follows.filter(follow => follow.follower_id === this.props.currentUserId && follow.followee_id === notUser.id)[0].id, 'follows')}>unfollow</button>
          </div>
          <div class="ProfileBio">
            <p>{notUser.bio}</p>
          </div>
        </div>

      </div>
    }
    </div>
    </div>
  )
}

}

function msp(state){
  return {
    currentUserId: state.currentUserId,
    users: state.users,
    user: state.user,
    follows: state.follows
  }
}

function mdp(dispatch){
  return {
  }
}



export default withRouter(connect(msp, mdp)(UserData));
