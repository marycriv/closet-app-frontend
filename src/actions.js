import { LOGIN, LOGOUT, HANDLE_CHANGE, GET_USERS, GET_ITEMS, GET_OUTFITS, GET_FOLLOWS, ADD_USER} from './types'

function login(){
  return {type: LOGIN}
}

function logout(){
  return {type: LOGOUT}
}

function getUsers(users){
  return {type: GET_USERS, payload: users}
}

function getItems(items){
  return {type: GET_ITEMS, payload: items}
}

function getFollows(follows){
  return {type: GET_FOLLOWS, payload: follows}
}

function getOutfits(outfits){
  return {type: GET_OUTFITS, payload: outfits}
}

function handleChange(text){
  return {type: HANDLE_CHANGE, payload: text}
}

function addUser(user){
  return {type: ADD_USER, payload: user}
}


export {
  logout,
  getUsers,
  getItems,
  getOutfits,
  getFollows
}
