import React from 'react';

import './../App.css';

import { connect } from 'react-redux';

import OutfitForm from './OutfitForm';

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
      <div>
      {outfits.map((outfit) => {
        return (
          <div id={outfit.id} className="OutfitCard">
            <h3>Outfit name: {outfit.name}</h3>
            {outfit.items.map((item) => {
              return (
                <div>
                  <p id={item.id}>{item.classification}</p>
                  <h4>{item.brand}</h4>
                  <img width="100px" alt="item" src={item.image} />
                </div>
              )})}

              <button onClick={(e) => this.setState({toggleEdit: !this.state.toggleEdit, outfitId: e.target.parentElement.id})} >Edit outfit</button>
              <button onClick={(e) => this.props.universalDeleteFunction(e.target.parentElement.id, 'outfits')} >Delete outfit</button>

              {this.state.toggleEdit && (parseInt(this.state.outfitId) === outfit.id) ?
                <OutfitForm
                outfitId={outfit.id}
                universalDeleteFunction={this.props.universalDeleteFunction}
                universalPostFunction={this.props.universalPostFunction}
                /> : null}

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
