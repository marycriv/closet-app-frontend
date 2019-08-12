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
    this.getOutfits()
  }

  postFunction = (imageUrl, brand, classification) => {
    console.log(this.props.currentUserId, imageUrl, brand, classification)
    let newItemSubmission = {
      user_id: this.props.currentUserId,
      image: imageUrl,
      classification: classification,
      brand: brand
    }

    fetch(`${API}/items`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(newItemSubmission)
    })
    .then(resp => resp.json())
    .then(console.log)
  }

  patchFunction = (itemId, imageUrl, brand, classification) => {
    console.log(itemId, this.props.currentUserId, imageUrl, brand, classification)

    let newItemSubmission = {
      user_id: this.props.currentUserId,
      image: imageUrl,
      classification: classification,
      brand: brand

    }

    fetch(`${API}/items/${parseInt(itemId)}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify(newItemSubmission)
    })
    .then(resp => resp.json())
    .then(console.log)
  }

  deleteFunction = (itemId) => {
    fetch(`${API}/items/${parseInt(itemId)}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(console.log)
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

  getOutfits = () => {
    fetch(`${API}/outfits`)
    .then(resp => resp.json())
    .then(outfits => this.props.sendOutfitsToState(outfits))
  }

  render(){
    return (
      <div className="App">
        <TopBar />
        {this.props.loggedIn ? <MainContainer postFunction={this.postFunction} patchFunction={this.patchFunction} deleteFunction={this.deleteFunction} /> : null}
      </div>
    );
  }
} // end app component

function msp(state){
  return {
    loggedIn: state.loggedIn,
    currentUserId: state.currentUserId,
    users: state.users,
    items: state.items,
    outfits: state.outfits
  }
}

function mdp(dispatch){
  return {
    sendUsersToState: (users) => {
      dispatch({type: "GET_USERS", payload: users})
    },
    sendItemsToState: (items) => {
      dispatch({type: "GET_ITEMS", payload: items})
    },
    sendOutfitsToState: (outfits) => {
      dispatch({type: "GET_OUTFITS", payload: outfits})
    }
  }
}

export default connect(msp, mdp)(App);
