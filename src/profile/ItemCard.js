import React from 'react';

import { connect } from 'react-redux';

const ItemCard = (props) => {

  // const user = props.users.find(user => user.id === props.currentUserId)

  const items = props.items.filter(item => {return item.user_id === props.currentUserId})


  return (
    <div className="ItemCard">
      {items.map((item) => {
        return (
          <div className="ItemCard">
            <img width="250px" alt={`${item.user_id}-${item.brand}`} key={`${item.brand}-${item.id}`} src={item.image} />
            <ul>
              <li>Id: {item.id}</li>
              <li>Brand: {item.brand}</li>
              <li>Classification: {item.classification}</li>
              <li>User id: {props.user.username}</li>
            </ul>
          </div>
      )
      })}
    </div>
  )

}

function msp(state){
  return {
    currentUserId: state.currentUserId,
    users: state.users,
    user: state.user,
    items: state.items
  }
}

function mdp(dispatch){
  return {
  }
}



export default connect(msp, mdp)(ItemCard);
