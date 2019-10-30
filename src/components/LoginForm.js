import React from 'react';

import { connect } from 'react-redux';

import {BrowserRouter} from 'react-router';

class LoginForm extends React.Component {

  state = {
    value: "elle"
  }

  submission = (e, userInput) => {
    e.preventDefault();

    let idNumber = this.props.users.map(user => {return user.username}).includes(userInput) ? this.props.users.find(user => user.username === userInput).id : null

    if (this.props.users.map(user => {return user.id}).includes(idNumber)) {
      this.props.login(idNumber)
      this.props.history.push(`/${userInput}`)
    } else {
      alert("Invalid login credentials")
    }


  }

  handleLoginChange = (event) => {
    this.setState({
      value: event.target.value
    })
  }


  render(){
    return (
      <div>
      <div className="loginHeading">Login credentials are prepopulated for you below. If you cannot see them, simply log in with the name "elle". If you're experiencing a log in error, just wait a minute for the backend to wake up.</div>
      <div className="LoginForm">
      <form onSubmit={(e) => this.submission(e, this.state.value)}>
      <h3>Login</h3>
      Username:
      <br/>
        <input
          type="text"
          // defaultValue="5"
          value={this.state.value}
          onChange={this.handleLoginChange}
        />
        <input type="submit" value="Submit" />
      </form>
      </div>
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

export default connect(msp, mdp)(LoginForm);
