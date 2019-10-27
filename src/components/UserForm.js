import React from 'react';

import { connect } from 'react-redux';

class UserForm extends React.Component {
  state = {
    userId: null,
    username: null,
    profilePicture: null,
    bio: null
  }

  handleSubmit = (e, state) => {
    e.preventDefault();


    let params = {}

    if (this.props.loggedIn) {
      params = {username: state.username, profilePicture: state.profilePicture, id: this.props.currentUserId, bio: state.bio}
      this.props.universalPatchFunction(params, "edit_user")
    } else {
      params = {username: state.username, profilePicture: state.profilePicture, id: this.state.userId, bio: state.bio}
      this.props.universalPostFunction(params, "new_user")
    }
  }

  handleChange = (e) => {
  this.setState({
    [e.target.name]: e.target.value
  })
}


  render(){
    return (
      <div className="UserForm">
        {!this.props.currentUserId ? <h2>Create an account!</h2> : <h3>Edit profile:</h3>}
        <form onSubmit={(e) => this.handleSubmit(e, this.state)}>
          Username:
          <br/>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <br/>
          Profile picture:
          <br/>
          <input
            type="text"
            name="profilePicture"
            value={this.state.profilePicture}
            onChange={this.handleChange}
          />
          <br/>
          Bio:
          <br/>
          <textarea
            name="bio"
            value={this.state.bio}
            onChange={this.handleChange}
          />
          <br/>
          <input type="submit" value="Submit" />
        </form>
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
    user: state.user
  }
}

function mdp(dispatch){
  return {
    login: (id) => {
      dispatch({type: "LOGIN", payload: id})
    }
  }
}

export default connect(msp, mdp)(UserForm);
