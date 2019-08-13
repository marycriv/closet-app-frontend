import React from 'react';

import { connect } from 'react-redux';

class OutfitForm extends React.Component {
  state = {
    userId: this.props.currentUserId,
    outfitName: "outfit test",
    top: "39",
    bottom: "38"
  }

  handleSubmit = (e, state, topItem, bottomItem) => {
    e.preventDefault();

    let params = {}

    params = {
        name: this.state.outfitName,
        user_id: this.state.userId,
        topItem: topItem.id,
        bottomItem: bottomItem.id
    }
    this.props.universalPostFunction(params, "NEW_OUTFIT")

  }

  handleChange = (e) => {
  this.setState({
    [e.target.name]: e.target.value
  })
}

  render(){

    let topItem = this.props.items.find(item => item.id === parseInt(this.state.top) && item.user_id === this.state.userId)

    let bottomItem = this.props.items.find(item => item.id === parseInt(this.state.bottom) && item.user_id === this.state.userId)

    return (
      <form onSubmit={(e) => this.handleSubmit(e, this.state, topItem, bottomItem)}>
        Name:
        <input
          type="text"
          name="outfitName"
          value={this.state.outfitName}
          onChange={this.handleChange}
        />
        <label>Top:</label>
        <input
          type="text"
          name="top"
          value={this.state.top}
          onChange={this.handleChange}
        />

        <label>Bottom:</label>
        <input
          type="text"
          name="bottom"
          value={this.state.bottom}
          onChange={this.handleChange}
        />

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
    items: state.items,
    outfits: state.outfits
  }
}

function mdp(dispatch){
  return {

  }
}

export default connect(msp, mdp)(OutfitForm);
