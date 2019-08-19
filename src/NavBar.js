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
        <div>
          <Link to={`/${user.username}`}>Home</Link>
          <br/>
          <Link to='/newoutfit'>New Outfit</Link>
          <br/>
          <Link onClick={() => this.props.logout()}>Logout</Link>
          <h3>Welcome back, {user.username}!</h3>
        </div>
        : <div>
          <Link to='/'>Home</Link>
          <br/>
          <Link to='/login'>Login</Link>
          <br/>
          <Link to='/signup'>Signup</Link>
        </div>
        }
        <SearchBar />
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
