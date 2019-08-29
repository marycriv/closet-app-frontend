import React from 'react'

import {Link} from 'react-router-dom'

import SearchBar from './SearchBar'

import { connect } from 'react-redux';

class NavBar extends React.Component {
  render(){
    return (
      <div>
      {this.props.loggedIn ?
        <div className="NavBar">
          <Link to={`/${this.props.user.username}`} className="NavBarItem">Home</Link>
          <Link onClick={() => this.props.logout()} className="NavBarItem">Logout</Link>
        </div>
        :
        <div className="NavBar">
          <Link to='/' className="NavBarItem">Home</Link>
          <Link to='/login' className="NavBarItem">Login</Link>
          <Link to='/signup' className="NavBarItem">Signup</Link>
        </div>
        }
      </div>
    )
  }
}

function msp(state){
  return {
    loggedIn: state.loggedIn,
    currentUserId: state.currentUserId,
    users: state.users,
    user: state.user
  }
}

function mdp(dispatch){
  return {
    logout: () => {
      dispatch({type: "LOGOUT"})
    }
  }
}



export default connect(msp, mdp)(NavBar)
