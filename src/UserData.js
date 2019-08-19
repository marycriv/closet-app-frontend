import React from 'react';

import './main.css'

import { connect } from 'react-redux';

import UserForm from './UserForm'

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
    <div className="UserData">
    { match ?
      <div className="CurrentUserBio">
        <h1 className="profile-real-name">{user.username}'s profile</h1>
        <h2 hidden>{user.id}</h2>
        <img width="100px" alt="profile" src={user.profile_picture} />
        <p><b>bio:</b> {user.bio}</p>
        <br/>
        <button onClick={() => this.setState({toggleEdit: !this.state.toggleEdit})}>Edit user info!</button>
        <br/><br/>
        { !this.state.toggleEdit ? null : <div className="UserSettings"><button onClick={() => this.props.universalDeleteFunction(user.id, 'users')}>Delete</button>
        <UserForm universalPatchFunction={this.props.universalPatchFunction} /><br/><br/></div>}
      </div>
      : <div className="NotCurrentUserBio">
        <h1 className="profile-real-name">{notUser.username}'s profile</h1>
        <h2 hidden>{notUser.id}</h2>
        <img width="100px" alt="profile" src={notUser.profile_picture} />
        <p><b>bio:</b> {notUser.bio}</p>
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
    user: state.user
  }
}

function mdp(dispatch){
  return {
  }
}



export default connect(msp, mdp)(UserData);
