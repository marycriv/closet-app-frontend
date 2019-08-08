import React from 'react';
import './header.css';
import LoginForm from './LoginForm';

import { Link } from 'react-router-dom';

const TopBar = () => {
  return (
    <div className="TopBar">
      <Link to="/">My Closet App</Link>
      <LoginForm />
    </div>
  )
}

export default TopBar
