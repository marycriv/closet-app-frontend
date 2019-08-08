import React from 'react';
import './header.css';
import LoginForm from './LoginForm';

const TopBar = () => {
  return (
    <div className="TopBar">
      <p>My Closet App</p>
      <LoginForm />
    </div>
  )
}

export default TopBar
