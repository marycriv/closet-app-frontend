import React from 'react';

import { connect } from 'react-redux';

class LoginForm extends React.Component {

  submission = (e) => {
    e.preventDefault();
    //if user # present in users
    // this.props.users.find()
    this.props.login()

  }


  render(){
    return (
      <form onSubmit={(e) => this.submission(e)}>
      User Id:
        <input type="text" defaultValue="5" />
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
  console.log("inside mdp")
  return {
    login: () => {
      dispatch({type: "LOGIN"})
    }
  }
}

export default connect(msp, mdp)(LoginForm);
