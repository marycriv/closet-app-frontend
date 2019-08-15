import React from 'react';

import './profile.css';

import './App.css';

import { connect } from 'react-redux';

class OutfitCard extends React.Component {

  state = {
    toggleEdit: false,
    outfitId: null
  }

  render(){

    // const items = this.props.outfits.map(outfit => {return outfit.items})


    // outfit doesnt have user_id
    const outfits = this.props.outfits.filter(outfit => {return outfit.user_id === this.props.currentUserId})
    return (
      <div className="OutfitCard">
      {outfits.map((outfit) => {
        return (
          <div id={outfit.id} style={{border: 'solid darkviolet'}}>
            <h3>Outfit name: {outfit.name}</h3>
            <div className="CardGallery">
            {outfit.items.map((item) => {
              return (
                <div className="CardGalleryItem">
                  <p hidden id={item.id}>{item.classification}</p>
                  <img width="100px" alt="item" src={item.image} />
                </div>
              )})}
              </div>
              <button onClick={(e) => this.props.universalDeleteFunction(e.target.parentElement.id, 'outfits')} >Delete outfit</button>

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
