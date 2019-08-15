import { LOGIN, LOGOUT, HANDLE_CHANGE, GET_USERS, GET_ITEMS, GET_FOLLOWS, GET_OUTFITS, ADD_USER } from './types'

const defaultState = {
  loggedIn: false,
  currentUserId: null,
  user: null,
  users: [],
  items: [],
  outfits: [],
  follows: []
}

function reducer(prevState=defaultState, action) {
  switch(action.type){
    case "LOGIN":
      return {...prevState, loggedIn: true, currentUserId: action.payload, user: prevState.users.find(user => user.id === action.payload)}
    case "LOGOUT":
      return {...prevState, loggedIn: false, currentUserId: null, user: null}
    case "HANDLE_CHANGE":
      return {...prevState, text: action.payload}
    case "GET_USERS":
      return {...prevState, users: action.payload}
    case "GET_ITEMS":
      return {...prevState, items: action.payload}
    case "GET_OUTFITS":
      return {...prevState, outfits: action.payload}
    case "GET_FOLLOWS":
      return {...prevState, follows: action.payload}
    case "NEW_USER":
      return {...prevState, users: [...prevState.users, action.payload]}
    case "NEW_ITEM":
      return {...prevState, items: [...prevState.items, action.payload]}
    case "NEW_OUTFIT":
      return {...prevState, outfits: [...prevState.outfits, action.payload]}
    case "NEW_FOLLOW":
      return {...prevState, follows: [...prevState.follows, action.payload]}
    default:
      return prevState
  }
}

export default reducer
