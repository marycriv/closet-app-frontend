import React from 'react';
import './App.css';
import TopBar from './constant/header/TopBar';
import UserForm from './constant/header/UserForm';
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

  universalPostFunction = (params, type) => {

    let currentUserId = this.props.currentUserId
    let payload = {}
    let loc = null

    const fetchFunction = (loc, payload) => {
      fetch(`${API}/${loc}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(payload)
      })
      .then(resp => resp.json())
      .then((json) => {
          this.getUsers()
          this.getItems()
          this.getOutfits()
        }
      )
    }

    function postFunc(params, type){

      switch(type){
      case "NEW_ITEM":
        payload = {
          user_id: currentUserId,
          image: params.image,
          classification: params.classification,
          brand: params.brand
        }
        loc = 'items'
        fetchFunction(loc, payload)
      case "NEW_USER":
        payload = {
          username: params.username,
          profile_picture: params.profilePicture
        }
        loc = 'users'
        fetchFunction(loc, payload)

      case "NEW_OUTFIT":
        payload = {
          name: params.name,
          user_id: params.user_id
        }
        loc = 'outfits'
        fetchFunction(loc, payload)
      case "NEW_OUTFIT_ITEM":
      payload = {
        outfit_id: params.outfit_id,
        item_id: params.item_id
      }
      fetchFunction('outfit_items', payload)
      default:
        return null
      }
    }

    postFunc(params, type)


  }

  universalPatchFunction = (params, type) => {

    let currentUserId = this.props.currentUserId
    let payload = {}
    let loc = null
    let patchLoc = null

    function postFunc(params, type){

      switch(type){
      case "EDIT_ITEM":
        patchLoc = parseInt(params.item_id)
        payload = {
          user_id: currentUserId,
          image: params.image,
          classification: params.classification,
          brand: params.brand
        }
        loc = 'items'
        fetchFunction(loc, patchLoc, payload)
      case "EDIT_USER":
        patchLoc = parseInt(params.id)
        payload = {
          username: params.username,
          profile_picture: params.profilePicture
        }
        loc = 'users'
        fetchFunction(loc, patchLoc, payload)
      default:
        return  null
      }

    }

    const fetchFunction = (loc, patchLoc, payload) => {
      fetch(`${API}/${loc}/${patchLoc}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify(payload)
      })
      .then(resp => resp.json())
      .then((json) => {
          this.getUsers()
          this.getItems()
          this.getOutfits()
        }
      )
    }

    postFunc(params, type)

  }

  universalDeleteFunction = (id, loc) => {
    fetch(`${API}/${loc}/${parseInt(id)}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    })
    .then(() => {
        this.getUsers()
        this.getItems()
        this.getOutfits()
      })

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
        {this.props.loggedIn ? <MainContainer universalPostFunction={this.universalPostFunction} universalPatchFunction={this.universalPatchFunction} universalDeleteFunction={this.universalDeleteFunction} /> : <UserForm universalPostFunction={this.universalPostFunction} />}
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
    },
    addUser: (user) => {
      dispatch({type: "ADD_USER", payload: user})
    }
  }
}

export default connect(msp, mdp)(App);
