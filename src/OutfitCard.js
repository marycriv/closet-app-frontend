import React from 'react';

import './main.css';

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
      <div className="OutfitsContainer">
      {outfits.map((outfit) => {
        return (
          <div id={outfit.id} className="OutfitCard">
            <div className="title"><h3>{outfit.name}</h3><p onClick={(e) => this.props.universalDeleteFunction(e.target.parentElement.parentElement.id, 'outfits')} ><i class="fa fa-times fa-2x" aria-hidden="true"></i></p></div>
            <div className="OutfitImages">
            {outfit.items.map((item) => {
              return (
                <div>
                  <p hidden id={item.id}>{item.classification}</p>
                  <img width="100px" alt="item" className="OutfitImage" src={item.image} />
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
