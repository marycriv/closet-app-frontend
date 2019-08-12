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
    const myItems = this.props.items.filter((item) => {return item.user_id === this.state.userId})

    const myTops = myItems.filter(item => {return item.classification === 'top'})

    const myBottoms = myItems.filter(item => {return item.classification === 'bottom'})

    return (
      <form onSubmit={(e) => this.handleSubmit(e, this.state)}>
        Name:
        <input
          type="text"
          name="imageUrl"
          value={this.state.imageUrl}
          onChange={this.handleChange}
        />
        <label>Top:</label>
        <select
          name="top"
          value={this.state.value} onChange={this.handleChange}>
        {myTops.map(top => {
          return (
            <option value={top.id}>{top.id}</option>
          )
        })}
        </select>

        <label>Bottom:</label>
        <select
          name="bottom"
          value={this.state.value} onChange={this.handleChange}>
          {myBottoms.map(bottom => {
            return (
              <option value={bottom.id}>{bottom.id}</option>
            )
          })}
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
    items: state.items,
    outfits: state.outfits
  }
}

function mdp(dispatch){
  return {

  }
}

export default connect(msp, mdp)(OutfitForm);
