import React from 'react';

import { connect } from 'react-redux';

class OutfitForm extends React.Component {
  state = {
    userId: this.props.currentUserId,
    outfitName: "outfit test",
    top: "39",
    bottom: "38"
  }

  handleSubmit = (e, state) => {
    e.preventDefault();
    const parent = e.target.parentElement.className

    let params = {}

    console.log(this.state.top, this.state.bottom)


    if (parent === "OutfitCard") {
      console.log("EDIT OUTFIT BUTTON CLICKED")
      this.props.universalDeleteFunction(this.props.outfitId, "outfits")
      console.log("Now time to edit")

      params = {
        name: this.state.outfitName,
        user_id: 15
    }
      this.props.universalPostFunction(params, "NEW_OUTFIT")

      //top
      params = {
        outfit_id: this.props.outfits.slice(-1)[0].id + 1,
        item_id: parseInt(this.state.top)
      }
      this.props.universalPostFunction(params, "NEW_OUTFIT_ITEM")

      // bottom
      params = {
        outfit_id: this.props.outfits.slice(-1)[0].id + 1,
        item_id: parseInt(this.state.bottom)
      }
      this.props.universalPostFunction(params, "NEW_OUTFIT_ITEM")


    } else {
      params = {
        name: this.state.outfitName,
        user_id: 15
    }
      this.props.universalPostFunction(params, "NEW_OUTFIT")

      //top
      params = {
        outfit_id: this.props.outfits.slice(-1)[0].id + 1,
        item_id: parseInt(this.state.top)
      }
      this.props.universalPostFunction(params, "NEW_OUTFIT_ITEM")

      // bottom
      params = {
        outfit_id: this.props.outfits.slice(-1)[0].id + 1,
        item_id: parseInt(this.state.bottom)
      }
      this.props.universalPostFunction(params, "NEW_OUTFIT_ITEM")

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
