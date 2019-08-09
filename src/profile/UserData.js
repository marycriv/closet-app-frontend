import React from 'react';

import { connect } from 'react-redux';

const UserData = (props) => {

  const user = props.users.find(user => user.id === props.currentUserId)

  return (
    <div className="UserData">
      <h1>{user.username}</h1>
      <h2>{user.id}</h2>
      <img width="100px" className="ProfilePicture" alt="profile pic" src={user.profile_picture} />
    </div>
  )

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
