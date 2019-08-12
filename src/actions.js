import { LOGIN, HANDLE_CHANGE, GET_USERS, GET_ITEMS } from './types'

function login(){
  return {type: LOGIN}
}

function getUsers(){
  return {type: "GET_USERS"}
}

function getUsers(){
  return {type: "GET_ITEMS"}
}

function getOutfits(){
  return {type: "GET_OUTFITS"}
}

function handleChange(text){
  return {type: "HANDLE_CHANGE", payload: text}
}


export {
  like,
  dislike,
  toggleDark,
  handleChange
}
