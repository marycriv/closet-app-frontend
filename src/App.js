import React from 'react';
import './App.css';
import TopBar from './TopBar';
import UserForm from './UserForm';
import MainContainer from './MainContainer';
import { connect } from 'react-redux';

import { Route, Switch } from 'react-router-dom'

const API = "http://localhost:3001"

class App extends React.Component {


  componentDidMount(){
    this.getUsers()
    this.getItems()
    this.getOutfits()
    this.getFollows()
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
          this.getFollows()
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
        break
      case "NEW_USER":
        payload = {
          username: params.username,
          profile_picture: params.profilePicture
        }
        loc = 'users'
        fetchFunction(loc, payload)
        break
      case "NEW_OUTFIT":
        payload = {
          name: params.name,
          user_id: params.user_id,
          topId: params.topItem,
          bottomId: params.bottomItem,
          shoesId: params.shoesItem
        }
        loc = 'outfits'
        fetchFunction(loc, payload)
        break
      //UNTESTED:
      case "NEW_FOLLOW":
        payload = {
          follower_id: currentUserId,
          followee_id: params
        }
        loc = 'follows'
        fetchFunction(loc, payload)
        break
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
        break
      case "EDIT_USER":
        patchLoc = parseInt(params.id)
        payload = {
          username: params.username,
          profile_picture: params.profilePicture
        }
        loc = 'users'
        fetchFunction(loc, patchLoc, payload)
        break
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

  getFollows = () => {
    fetch(`${API}/follows`)
    .then(resp => resp.json())
    .then(follows => this.props.sendFollowsToState(follows))
  }

  getOutfits = () => {
    fetch(`${API}/outfits`)
    .then(resp => resp.json())
    .then(outfits => this.props.sendOutfitsToState(outfits))
  }

  render(){
    return (
      <div className="App">
        <TopBar universalPostFunction={this.universalPostFunction}
        universalPatchFunction={this.universalPatchFunction} universalDeleteFunction={this.universalDeleteFunction}
        />
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
    sendFollowsToState: (follows) => {
      dispatch({type: "GET_FOLLOWS", payload: follows})
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
