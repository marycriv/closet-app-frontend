import React from 'react';

import { connect } from 'react-redux';

class OutfitForm extends React.Component {
  state = {
    userId: this.props.currentUserId
  }

  handleSubmit = (e, state) => {
    e.preventDefault();

    const parent = e.target.parentElement.className
    const itemId = e.target.parentElement.id
    let params = {}

    if (parent === "OutfitCard") {
      this.props.universalPatchFunction(itemId, state.imageUrl, state.brand, state.classification)
    } else {
      params = {
        name: "outfit three",
        user_id: 15
      }

      this.props.universalPostFunction(params, "NEW_OUTFIT")
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
        Name:
        <input
          type="text"
          name="imageUrl"
          value={this.state.imageUrl}
          onChange={this.handleChange}
        />

        <select
          name="top"
          value={this.state.value} onChange={this.handleChange}>
            <option value="1">t1</option>
            <option value="2">t2</option>
        </select>

        <select
          name="bottom"
          value={this.state.value} onChange={this.handleChange}>
            <option value="1">b1</option>
            <option value="2">b2</option>
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

export default connect(msp, mdp)(OutfitForm);
