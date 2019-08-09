import React from 'react';
import './main.css';

import { connect } from 'react-redux';

const MainContainer = (props) => {

  const user = props.users.find(user => user.id === props.currentUserId)

  const items = props.items.filter(item => {return item.user_id === props.currentUserId})

  const itemsData = items.map((item) => {
    return(<img width="250px" src={item.image} />)
  })

  console.log("current props from Main Container", props)
  return (
    <div className="MainContainer">
      <p>Main Container</p>
      <h2>{user.username}</h2>
      {itemsData}
    </div>
  )
}

function msp(state){
  return {
    currentUserId: state.currentUserId,
    users: state.users,
    items: state.items
  }
}

function mdp(dispatch){
  console.log("inside mdp")
  return {
  }
}

export default connect(msp, mdp)(MainContainer);
