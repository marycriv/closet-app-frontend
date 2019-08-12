import React from 'react';

import { connect } from 'react-redux';

class UserForm extends React.Component {
  state = {
    userId: this.props.currentUserId,
    username: "serena",
    profilePicture: "https://66.media.tumblr.com/279015f65eef8112eb3e84aa27417be0/tumblr_owzholWRAb1vwrqjho9_250.png"
  }

  handleSubmit = (e, state) => {
    e.preventDefault();

    const parent = e.target.parentElement.className
    const itemId = e.target.parentElement.id
    let params = {}

    if (parent === "UserData") {
      params = {username: state.username, profilePicture: state.profilePicture, id: this.state.userId}
      this.props.universalPatchFunction(params, "EDIT_USER")
    } else {
      params = {username: state.username, profilePicture: state.profilePicture, id: this.state.userId}
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
      <form onSubmit={(e) => this.handleSubmit(e, this.state)}>
        Username:
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
        />
        Profile picture:
        <input
          type="text"
          name="profilePicture"
          value={this.state.profilePicture}
          onChange={this.handleChange}
        />
        <input type="submit" value="Submit" />
      </form>
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

  }
}

export default connect(msp, mdp)(UserForm);
