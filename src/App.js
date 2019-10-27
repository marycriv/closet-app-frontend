import React from 'react';
import './App.css';
import UserForm from './components/UserForm';
import MainContainer from './containers/MainContainer';
import LoginForm from './components/LoginForm';
import NotFound from './components/NotFound';
import DemoVideo from './components/DemoVideo';
import NavBar from './components/NavBar';
import OutfitBuilder from './components/OutfitBuilder';
import LandingPage from './components/LandingPage'
import { connect } from 'react-redux';

import { Route, Switch } from 'react-router-dom'

import {withRouter} from "react-router-dom";

const API = "https://missmatched-backend.herokuapp.com/"

class App extends React.Component {

  state={
    loading: true
  }

  componentDidMount(){
    this.getUsers()
    this.getItems()
    this.getOutfits()
    this.getFollows()
    this.setState({loading: false})
  }

  universalPostFunction = (params, type) => {

    let currentUserId = this.props.currentUserId
    let input = {}
    let loc = null

    const fetchFunction = (loc, input) => {
      fetch(`${API}/${loc}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(input)
      })
      .then(resp => resp.json())
      .then((json) => {
      if (loc === 'items') {
        this.props.newItem(json)
      } else if (loc === 'users') {
        this.props.newUser(json)
        this.props.login(json.id)
        this.props.history.push(`/${json.username}`)
      } else if (loc === 'outfits') {
        this.getOutfits()
        this.props.history.push(this.props.users.find(user => user.id === input.user_id).username)
      } else if (loc === 'follows') {
        this.props.newFollow(json)
      }
      })
    }

    function postFunc(params, type){

      switch(type){
      case "new_item":
        input = {
          user_id: currentUserId,
          image: params.image,
          classification: params.classification,
          brand: params.brand
        }
        loc = 'items'
        fetchFunction(loc, input)
        break
      case "new_user":
        input = {
          username: params.username,
          profile_picture: params.profilePicture,
          bio: params.bio
        }
        loc = 'users'
        fetchFunction(loc, input)
        break
      case "new_outfit":
        input = {
          name: params.name,
          user_id: params.user_id,
          ids: params.ids,
          author_id: params.author_id,
          username: params.username
        }
        loc = 'outfits'
        fetchFunction(loc, input)
        break
      //UNTESTED:
      case "new_follow":
        input = {
          follower_id: currentUserId,
          followee_id: params.followee_id
        }
        loc = 'follows'
        fetchFunction(loc, input)
        break
      default:
        return null
      }
    }

    postFunc(params, type)

  }

  universalPatchFunction = (params, type) => {

    let currentUserId = this.props.currentUserId
    let input = {}
    let loc = null
    let patchLoc = null

    function postFunc(params, type){

      switch(type){
      case "edit_item":
        patchLoc = parseInt(params.item_id)
        input = {
          user_id: currentUserId,
          image: params.image,
          classification: params.classification,
          brand: params.brand
        }
        loc = 'items'
        fetchFunction(loc, patchLoc, input)
        break
      case "edit_user":
        patchLoc = parseInt(params.id)
        input = {
          username: params.username,
          profile_picture: params.profilePicture,
          bio: params.bio
        }
        loc = 'users'
        fetchFunction(loc, patchLoc, input)
        break
      default:
        return  null
      }

    }

    const fetchFunction = (loc, patchLoc, input) => {
      fetch(`${API}/${loc}/${patchLoc}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify(input)
      })
      .then(resp => resp.json())
      .then((json) => {
      // fix this later
      console.log("Refresh the page and login to see this change!", json)
      })
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
    if (loc === 'items') {
      this.getItems()
    } else if (loc === 'users') {
      this.getUsers()
      this.props.logout()
      this.props.history.push('/signup')
    } else if (loc === 'outfits') {
      this.getOutfits()
    } else if (loc === 'follows') {
      this.getFollows()
      this.props.history.push(`/${this.props.user.username}`)
    }
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
      {this.state.loading ? <div><h1>loading</h1></div> :
        <div>
        <NavBar/>
        <Switch>
          <Route path='/bepis' exact component={NotFound} />
          <Route path='/' exact component={LandingPage} />
          <Route path='/login' component={LoginForm}/>
          <Route path='/signup' render={() => <UserForm universalPostFunction={this.universalPostFunction} universalPatchFunction={this.universalPatchFunction} universalDeleteFunction={this.universalDeleteFunction}
          />}/>
          <Route path='/demo' component={DemoVideo}/>
          { this.props.loggedIn &&
          <Route path='/newoutfit' render={() =>
            <OutfitBuilder universalPostFunction={this.universalPostFunction} />}
          />
        }
        <Route exact path='/edit' render={() => <UserForm universalPostFunction={this.universalPostFunction} universalPatchFunction={this.universalPatchFunction} universalDeleteFunction={this.universalDeleteFunction}
        />}/>
          <Route exact path='/:username' render={() => <MainContainer universalPostFunction={this.universalPostFunction} universalPatchFunction={this.universalPatchFunction} universalDeleteFunction={this.universalDeleteFunction}
          />}/>
          <Route component={NotFound} />

          {/*<Route path='/:username' component={}/>
          <Route path='/:username/edit' component={}/>*/}

          {/*<MainContainer universalPostFunction={this.universalPostFunction} universalPatchFunction={this.universalPatchFunction} universalDeleteFunction={this.universalDeleteFunction}
          />*/}


        </Switch>
        </div>
      }
        {/*this.props.loggedIn ? <MainContainer universalPostFunction={this.universalPostFunction} universalPatchFunction={this.universalPatchFunction} universalDeleteFunction={this.universalDeleteFunction} /> : <UserForm universalPostFunction={this.universalPostFunction} />*/}
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
    outfits: state.outfits,
    user: state.user
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
    newUser: (user) => {
      dispatch({type: "NEW_USER", payload: user})
    },
    newItem: (item) => {
      dispatch({type: "NEW_ITEM", payload: item})
    },
    newOutfit: (outfit) => {
      dispatch({type: "NEW_OUTFIT", payload: outfit})
    },
    newFollow: (follow) => {
      dispatch({type: "NEW_FOLLOW", payload: follow})
    },
    login: (id) => {
      dispatch({type: "LOGIN", payload: id})
    },
    logout: () => {
      dispatch({type: "LOGOUT"})
    }
  }
}

export default withRouter(connect(msp, mdp)(App));
