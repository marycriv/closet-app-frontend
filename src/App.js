import React from 'react';
import './App.css';
import TopBar from './constant/header/TopBar';
import MainContainer from './constant/main/MainContainer';
import { connect } from 'react-redux';

const API = "http://localhost:3001"

class App extends React.Component {

  // state = {
  //   users: [],
  //   items: [],
  //   currentUserId: null
  // }
  //
  componentDidMount(){
    this.getUsers()
    this.getItems()
  }

  getUsers = () => {
    fetch(`${API}/users`)
    .then(resp => resp.json())
    .then(users => this.props.sendUsersToState(users))
  }

  getItems = () => {
    fetch(`${API}/items`)
    .then(resp => resp.json())
    .then(items => this.props.sendItemsToState(items))
  }

  render(){
    console.log("app props", this.props)
    return (
      <div className="App">
        <TopBar />
        {this.props.loggedIn ? <MainContainer /> : null}
      </div>
    );
  }
} // end app component

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
    sendUsersToState: (users) => {
      dispatch({type: "GET_USERS", payload: users})
    },
    sendItemsToState: (items) => {
      dispatch({type: "GET_ITEMS", payload: items})
    }
  }
}

export default connect(msp, mdp)(App);
