import React from 'react';

import './../App.css';

import { connect } from 'react-redux';

class OutfitCard extends React.Component {

  render(){

    // const items = this.props.outfits.map(outfit => {return outfit.items})


    // outfit doesnt have user_id
    const outfits = this.props.outfits.filter(outfit => {return outfit.user_id === this.props.currentUserId})


    console.log("bepis", outfits)

    return (
      <div>
      {outfits.map((outfit) => {
        return (
          <div className="OutfitCard">
            <h3>Outfit name: {outfit.name}</h3>
            {outfit.items.map((item) => {
              return (
                <div>
                  <p>{item.brand}</p>
                  <img width="100px" alt="item" src={item.image} />
                </div>
              )})}
              <button onClick={() => this.props.universalDeleteFunction(outfit.id, 'outfits')}>Delete</button>
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
