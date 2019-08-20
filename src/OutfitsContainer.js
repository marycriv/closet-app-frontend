import React from 'react';

import { connect } from 'react-redux';

import OutfitCard from './OutfitCard';


const OutfitsContainer = (props) => {
  return (
    <div>
      <OutfitCard   universalDeleteFunction={props.universalDeleteFunction}
        universalPatchFunction={props.universalPatchFunction}
        universalPostFunction={props.universalPostFunction}
        path={props.path}
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
