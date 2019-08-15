import React from 'react'

import {Link} from 'react-router-dom'

import { connect } from 'react-redux';

class NavBar extends React.Component {
  render(){
    let user = this.props.users.find(user => user.id === this.props.currentUserId)
    return (
      <div className="NavBar">
      {this.props.loggedIn ?
        <div>
          <Link to='/dashboard'>Home</Link>
          <br/>
          <h3>Welcome back, {user.username}!</h3>
        </div>
        : <div>
          <Link to='/dashboard'>Home</Link>
          <br/>
          <Link to='/login'>Login</Link>
          <br/>
          <Link to='/signup'>Signup</Link>
        </div>
        }
        <p>Search bar placeholder</p>
      </div>
    )
  }
}

function msp(state){
  return {
    loggedIn: state.loggedIn,
    currentUserId: state.currentUserId,
    users: state.users
  }
}

export default connect(msp)(NavBar)
