import React from 'react';

import { connect } from 'react-redux';

import OutfitCard from './OutfitCard';
import OutfitForm from './OutfitForm';


const OutfitsContainer = (props) => {
  return (
    <div className="OutfitsContainer">
      <OutfitCard   universalDeleteFunction={props.universalDeleteFunction}
        universalPatchFunction={props.universalPatchFunction}
        universalPostFunction={props.universalPostFunction}
      />

    </div>
  )
}

function msp(state){
  return {
    currentUserId: state.currentUserId,
    users: state.users
  }
}

function mdp(dispatch){
  return {
  }
}

export default connect(msp, mdp)(OutfitsContainer);
