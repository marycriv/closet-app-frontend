import React from 'react';

import { connect } from 'react-redux';

class NewItemForm extends React.Component {
  state = {
    userId: this.props.currentUserId,
    imageUrl: "https://d2h1pu99sxkfvn.cloudfront.net/b0/153222/537640379_dantM51G6C/P0.jpg",
    brand: "topshop",
    classification: "top"
  }

  handleSubmit = (e, state) => {
    e.preventDefault();

    const parent = e.target.parentElement.className
    const itemId = e.target.parentElement.id

    if (parent === "ItemCard") {
      this.props.patchFunction(itemId, state.imageUrl, state.brand, state.classification)
    } else {
      this.props.postFunction(state.imageUrl, state.brand, state.classification)
    }

  }

  handleChange = (e) => {
  this.setState({
    [e.target.name]: e.target.value
  })
}


  render(){
    return (
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
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
        </select>
        <input type="submit" value="Submit" />
      </form>
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

export default connect(msp, mdp)(NewItemForm);
