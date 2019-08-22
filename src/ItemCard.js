import React from 'react';

import './main.css'

import { connect } from 'react-redux';

import ItemForm from './ItemForm';

class ItemCard extends React.Component {

  state = {
    toggleEdit: false,
    itemId: null
  }

render(){

  const path = this.props.path

  const notUser = this.props.users.filter(user => user.username === this.props.path)[0]

  const match = this.props.user === notUser

  let items = []

  let tops = []

  let bottoms = []

  let shoes = []

  let dresses = []

  let checkMatch = (match) => {

    if (match) {
      items = this.props.items.filter(item => {return item.user_id === this.props.currentUserId})

      tops = items.filter(item => {return ['top', 'blouse', 'sweater'].includes(item.classification)})

      bottoms = items.filter(item => {return ['bottom', 'trousers', 'jeans', 'skirt', 'shorts'].includes(item.classification)})

      shoes = items.filter(item => {return item.classification === 'shoes'})

      dresses = items.filter(item => {return ['dress', 'romper'].includes(item.classification)})
    } else {

      items = this.props.items.filter(item => {return item.user_id === notUser.id})

      tops = items.filter(item => {return ['top', 'blouse', 'sweater'].includes(item.classification)})

      bottoms = items.filter(item => {return ['bottom', 'trousers', 'jeans', 'skirt', 'shorts'].includes(item.classification)})

      shoes = items.filter(item => {return item.classification === 'shoes'})

      dresses = items.filter(item => {return ['dress', 'romper'].includes(item.classification)})
    }
  }

  checkMatch(match)

  return (
    <div className="CardGallery">
      {items.map((item) => {
        return (
          <div className="CardGalleryItem" id={item.id}>
            <img alt={`${item.user_id}-${item.brand}`} key={`${item.brand}-${item.id}`} src={item.image} title={item.id}  />
            <h3>{item.brand} {item.classification}</h3>
            {match ?
            <div className="editButtons">
              <button onClick={(e) => this.setState({toggleEdit: !this.state.toggleEdit, itemId: e.target.parentElement.parentElement.id})} >Edit item</button>
              <button onClick={(e) => this.props.universalDeleteFunction(e.target.parentElement.parentElement.id, 'items')} >Delete item</button>
              {this.state.toggleEdit && (parseInt(this.state.itemId) === item.id) ? <ItemForm universalPatchFunction={this.props.universalPatchFunction} universalPostFunction={this.props.universalPostFunction} /> : null}
            </div>
            : null
            }
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
