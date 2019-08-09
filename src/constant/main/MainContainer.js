import React from 'react';
import './main.css';

import { connect } from 'react-redux';

import ItemCard from './../../profile/ItemCard';

const MainContainer = (props) => {

  const user = props.users.find(user => user.id === props.currentUserId)

  const items = props.items.filter(item => {return item.user_id === props.currentUserId})

  const itemsData = items.map((item) => {
    return (<img width="250px" alt={`${item.user_id}-${item.brand}`} key={`${item.brand}-${item.id}`} src={item.image} />)
  })

  return (
    <div className="MainContainer">
      <p>Main Container</p>
      <h2>{user.username}</h2>
      <ItemCard />
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
  return {
  }
}

export default connect(msp, mdp)(MainContainer);
