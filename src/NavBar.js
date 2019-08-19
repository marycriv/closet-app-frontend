import React from 'react'

import {Link} from 'react-router-dom'

import SearchBar from './SearchBar'

import { connect } from 'react-redux';

class NavBar extends React.Component {
  render(){
    let user = this.props.users.find(user => user.id === this.props.currentUserId)
    return (
      <div className="NavBar">
      {this.props.loggedIn ?
        <div className="NavBar">
          <Link to={`/${user.username}`} className="NavBarItem">Home</Link>
          <Link to='/newoutfit' className="NavBarItem">New Outfit</Link>
          <Link onClick={() => this.props.logout()} className="NavBarItem">Logout</Link>
        </div>
        : <div className="NavBar">
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
