import React from 'react';

import './main.css'

import { connect } from 'react-redux';

import ItemForm from './ItemForm';

class ItemCard extends React.Component {

  state = {
    toggleEdit: false,
    itemId: null
  }

  // const user = props.users.find(user => user.id === props.currentUserId)


  // remember patch by element id!!

render(){
  const items = this.props.items.filter(item => {return item.user_id === this.props.currentUserId})
  return (
    <div className="CardGallery">
      {items.map((item) => {
        return (
          <div className="CardGalleryItem" id={item.id}>
            <img width="250px" alt={`${item.user_id}-${item.brand}`} key={`${item.brand}-${item.id}`} src={item.image} title={item.id}  />

            <button onClick={(e) => this.setState({toggleEdit: !this.state.toggleEdit, itemId: e.target.parentElement.id})} >Edit item</button>
            <button onClick={(e) => this.props.universalDeleteFunction(e.target.parentElement.id, 'items')} >Delete item</button>


            {this.state.toggleEdit && (parseInt(this.state.itemId) === item.id) ? <ItemForm universalPatchFunction={this.props.universalPatchFunction} universalPostFunction={this.props.universalPostFunction} /> : null}
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
