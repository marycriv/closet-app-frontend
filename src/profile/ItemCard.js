import React from 'react';

import { connect } from 'react-redux';

import NewItemForm from './NewItemForm';

class ItemCard extends React.Component {

  state = {
    toggleEdit: false,
    itemId: null
  }


  // const user = props.users.find(user => user.id === props.currentUserId)



render(){
  const items = this.props.items.filter(item => {return item.user_id === this.props.currentUserId})
  return (
    <div className="ItemCard">
      {items.map((item) => {
        return (
          <div className="ItemCard" id={item.id}>
            <img width="250px" alt={`${item.user_id}-${item.brand}`} key={`${item.brand}-${item.id}`} src={item.image}  />
            <ul>
              <li>Id: {item.id}</li>
              <li>Brand: {item.brand}</li>
              <li>Classification: {item.classification}</li>
              <li>Owner: {this.props.user.username}</li>
            </ul>

            <button onClick={(e) => this.setState({toggleEdit: !this.state.toggleEdit, itemId: e.target.parentElement.id})} >Edit item</button>
            <button onClick={(e) => this.props.deleteFunction(e.target.parentElement.id)} >Delete item</button>


            {this.state.toggleEdit && (parseInt(this.state.itemId) === item.id) ? <NewItemForm patchFunction={this.props.patchFunction} /> : null}
          </div>
      )
      })}

    </div>
  )
}

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
