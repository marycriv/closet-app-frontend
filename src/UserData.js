import React from 'react';

import './profile.css'

import { connect } from 'react-redux';

import UserForm from './UserForm'

class UserData extends React.Component {

  state = {
    toggleEdit: false
  }

render(){
  const user = this.props.users.find(user => user.id === this.props.currentUserId)
  //dont change UserData w/o fixing patch

  return (
    <div className="UserData">
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
  )
}

}

function msp(state){
  return {
    currentUserId: state.currentUserId,
    users: state.users
  }
}

function mdp(dispatch){
  return {
  }
}



export default connect(msp, mdp)(UserData);
