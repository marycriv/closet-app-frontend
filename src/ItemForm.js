import React from 'react';

import { connect } from 'react-redux';

class ItemForm extends React.Component {
  state = {
    userId: this.props.currentUserId,
    imageUrl: "https://d2h1pu99sxkfvn.cloudfront.net/b0/153222/537640379_dantM51G6C/P0.jpg",
    brand: "topshop",
    classification: "top"
  }

  handleSubmit = (e, state) => {
    e.preventDefault();
    const parent = e.target.parentElement.parentElement.className
    const itemId = e.target.parentElement.parentElement.id
    let params = {}
    //remember this is conditional
    if (parent === "CardGalleryItem") {
      params = {
        image: state.imageUrl,
        brand: state.brand,
        classification: state.classification,
        item_id: itemId
      }

      this.props.universalPatchFunction(params, "EDIT_ITEM")
    } else {
      params = {
        image: state.imageUrl,
        brand: state.brand,
        classification: state.classification
      }

      this.props.universalPostFunction(params, "NEW_ITEM")
    }

  }

  handleChange = (e) => {
  this.setState({
    [e.target.name]: e.target.value
  })
}


  render(){
    return (
      <div className="ItemForm">
      <form onSubmit={(e) => this.handleSubmit(e, this.state)}>
        Image URL:
        <input
          type="text"
          name="imageUrl"
          value={this.state.imageUrl}
          onChange={this.handleChange}
        />
        Brand:
        <input
          type="text"
          name="brand"
          value={this.state.brand}
          onChange={this.handleChange}
        />
        <select
          name="classification"
          value={this.state.value} onChange={this.handleChange}>
          <option value="top">Blouse</option>
          <option value="sweater">Sweater</option>
          <option value="trousers">Trousers</option>
          <option value="jeans">Jeans</option>
          <option value="shorts">Shorts</option>
          <option value="skirt">Skirt</option>
          <option value="dress">Dress</option>
          <option value="romper">Romper</option>
          <option value="shoes">Shoes</option>
        </select>
        <input type="submit" value="Submit" />
      </form>
      </div>
    )
  }
}

function msp(state){
  return {
    loggedIn: state.loggedIn,
    currentUserId: state.currentUserId,
    users: state.users,
    items: state.items
  }
}

function mdp(dispatch){
  return {

  }
}

export default connect(msp, mdp)(ItemForm);
