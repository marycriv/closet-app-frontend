
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
    case "ADD_USER":
      return {...prevState, users: [...prevState.users, action.payload]}
    default:
      return prevState
  }
}

export default reducer
