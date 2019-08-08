import React from 'react';
import logo from './logo.svg';
import './App.css';
import TopBar from './constant/header/TopBar';
import MainContainer from './constant/main/MainContainer';

const API = "http://localhost:3001"

export default class App extends React.Component {
  state = {
    users: [],
    items: [],
    currentUserId: null
  }

  componentDidMount(){
    this.getUsers()
    this.getItems()
  }

  getUsers = () => {
    fetch(`${API}/users`)
    .then(resp => resp.json())
    .then(users => this.setState({
      users: users
    }, console.log(this.state.users)))
  }

  getItems = () => {
    fetch(`${API}/items`)
    .then(resp => resp.json())
    .then(items => this.setState({
      items: items
    }, console.log(this.state.items)))
  }

  render(){
    return (
      <div className="App">
        <TopBar />
        <MainContainer currentUserId={this.state.currentUserId}
        users={this.state.users}
        items={this.state.items}
        />
      </div>
    );
  }
} // end app class
