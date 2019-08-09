
const defaultState = {
  loggedIn: false,
  currentUserId: null,
  users: [],
  items: []
}

function reducer(prevState=defaultState, action) {
  switch(action.type){
    case "LOGIN":
      return {...prevState, loggedIn: true, currentUserId: action.payload}
    case "HANDLE_CHANGE":
      return {...prevState, text: action.payload}
    case "GET_USERS":
      return {...prevState, users: action.payload}
    case "GET_ITEMS":
      return {...prevState, items: action.payload}
    default:
      return prevState
  }
}

export default reducer
