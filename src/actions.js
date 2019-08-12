import { LOGIN, HANDLE_CHANGE, GET_USERS, GET_ITEMS, ADD_USER } from './types'

function login(){
  return {type: LOGIN}
}

function getUsers(){
  return {type: GET_USERS}
}

function getItems(){
  return {type: GET_ITEMS}
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
  like,
  dislike,
  toggleDark,
  handleChange
}
