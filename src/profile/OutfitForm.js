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

    if (parent === "OutfitCard") {
      this.props.universalPatchFunction(itemId, state.imageUrl, state.brand, state.classification)
    } else {
      this.props.universalPostFunction(state.imageUrl, state.brand, state.classification)
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

        Items:

        <label><img width="50px" src="https://d2h1pu99sxkfvn.cloudfront.net/b0/153222/483700166_sRmhL35Pri/P0.jpg"/></label>
        <input
          type="checkbox"
          name="imageUrl"
          value={this.state.imageUrl}
          onChange={this.handleChange}
        />

        <label><img width="50px" src="https://d2h1pu99sxkfvn.cloudfront.net/b0/153222/483700166_sRmhL35Pri/P0.jpg"/></label>
        <input
          type="checkbox"
          name="imageUrl"
          value={this.state.imageUrl}
          onChange={this.handleChange}
        />

        <label><img width="50px" src="https://d2h1pu99sxkfvn.cloudfront.net/b0/153222/483700166_sRmhL35Pri/P0.jpg"/></label>
        <input
          type="checkbox"
          name="imageUrl"
          value={this.state.imageUrl}
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
    items: state.items
  }
}

function mdp(dispatch){
  return {

  }
}

export default connect(msp, mdp)(OutfitForm);
