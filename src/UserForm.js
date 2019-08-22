import React from 'react';

import { connect } from 'react-redux';

class UserForm extends React.Component {
  state = {
    userId: this.props.currentUserId,
    username: "serena",
    profilePicture: "https://66.media.tumblr.com/279015f65eef8112eb3e84aa27417be0/tumblr_owzholWRAb1vwrqjho9_250.png",
    bio: "Bio here"
  }

  handleSubmit = (e, state) => {
    e.preventDefault();

    const parent = e.target.parentElement.parentElement.className
    let params = {}

    if (this.props.loggedIn) {
      params = {username: state.username, profilePicture: state.profilePicture, id: this.props.currentUserId, bio: state.bio}
      this.props.universalPatchFunction(params, "EDIT_USER")
    } else {
      params = {username: state.username, profilePicture: state.profilePicture, id: this.state.userId, bio: state.bio}
      this.props.universalPostFunction(params, "NEW_USER")
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
    items: state.items
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
