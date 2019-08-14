import { LOGIN, LOGOUT, HANDLE_CHANGE, GET_USERS, GET_ITEMS, ADD_USER, GET_FOLLOWS} from './types'

function login(){
  return {type: LOGIN}
}

function logout(){
  return {type: LOGOUT}
}

function getUsers(){
  return {type: GET_USERS}
}

function getItems(){
  return {type: GET_ITEMS}
}

function getFollows(){
  return {type: GET_FOLLOWS}
}

function getOutfits(){
  return {type: GET_OUTFITS}
}

function handleChange(text){
  return {type: HANDLE_CHANGE, payload: text}
}

function addUser(user){
  return {type: ADD_USER, payload: user}
}


export {
  logout
}
