import React from 'react';

import './../main.css';

import { connect } from 'react-redux';

class OutfitCard extends React.Component {

  state = {
    toggleEdit: false,
    outfitId: null
  }

  render(){

    const path = this.props.path

    const notUser = this.props.users.filter(user => user.username === path)[0]

    const match = this.props.user === notUser

    let outfits = []
    let myOutfits = []
    let notMyOutfits = []

    let checkMatch = (match) => {

      if (match) {
        myOutfits = this.props.outfits.filter(outfit => {return outfit.user_id === this.props.currentUserId}).reverse()
        outfits.forEach(outfit => console.log(outfit.author_id))
      } else {

        notMyOutfits = this.props.outfits.filter(outfit => {return outfit.user_id === notUser.id}).reverse()
      }
      outfits.forEach(outfit => console.log(outfit.author_id))
    }

    checkMatch(match)

    // const items = this.props.outfits.map(outfit => {return outfit.items})


    // outfit doesnt have user_id

    return (
      <div className="OutfitsContainer">
      {myOutfits.map((outfit) => {
        return (
          <div id={outfit.id} className="OutfitCard">
            <div className="title"><h3>{outfit.name}</h3>{/*<img alt={outfit.name} style={{'borderRadius': '50%'}} width="40px" src={this.props.users.find(user => user.id === parseInt(outfit.author_id)).profile_picture}/>*/}<p onClick={(e) => this.props.universalDeleteFunction(e.target.parentElement.parentElement.parentElement.id, 'outfits')} ><i class="fa fa-times fa-2x" aria-hidden="true"></i></p></div>
            <div className="OutfitImages">
            {outfit.items.map((item) => {
              return (
                <div>
                  <p hidden id={item.id}>{item.classification}</p>
                  <img title={item.id} alt="item" className="OutfitImage" src={item.image} />
                </div>
              )})}
              </div>

          </div>
        )
      })}

      {notMyOutfits.map((outfit) => {
        return (
          <div id={outfit.id} className="OutfitCard">
            <div className="title"><h3>{outfit.name}</h3>{/*<img alt={outfit.name} style={{'borderRadius': '50%'}} width="40px" src={this.props.users.find(user => user.id === parseInt(outfit.author_id)).profile_picture}/>*/}</div>
            <div className="OutfitImages">
            {outfit.items.map((item) => {
              return (
                <div>
                  <p hidden id={item.id}>{item.classification}</p>
                  <img title={item.id} alt="item" className="OutfitImage" src={item.image} />
                </div>
              )})}
              </div>

          </div>
        )
      })}
        <p></p>
      </div>
    )
  }

}

function msp(state){
  return {
    currentUserId: state.currentUserId,
    users: state.users,
    user: state.user,
    items: state.items,
    outfits: state.outfits
  }
}

function mdp(dispatch){
  return {
  }
}



export default connect(msp, mdp)(OutfitCard);
