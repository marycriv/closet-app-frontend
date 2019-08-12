import React from 'react';

import { connect } from 'react-redux';

class LoginForm extends React.Component {

  state = {
    value: 15
  }

  submission = (e, userInput) => {
    e.preventDefault();
    userInput = parseInt(userInput)
    this.props.users.map(user => {return user.id}).includes(userInput) ? this.props.login(userInput) : alert("Invalid login credentials")
  }

  handleLoginChange = (event) => {
    this.setState({
      value: event.target.value
    })
  }


  render(){
    return (
      <form onSubmit={(e) => this.submission(e, this.state.value)}>
      User Id:
        <input
          type="text"
          // defaultValue="5"
          value={this.state.value}
          onChange={this.handleLoginChange}
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
    login: (id) => {
      dispatch({type: "LOGIN", payload: id})
    }
  }
}

export default connect(msp, mdp)(LoginForm);
