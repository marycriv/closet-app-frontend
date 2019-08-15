import React from 'react';
import './flickity.css';
import Flickity from 'react-flickity-component';

import { connect } from 'react-redux';


class Slider extends React.Component {

  state = {
    outfitName: "Outfit name here"
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  render(){

    const flickityOptions = {
        wrapAround: true
    }

    const myTops = this.props.items.filter(item => item.user_id === this.props.currentUserId && item.classification === 'top')
    const myBottoms = this.props.items.filter(item => item.user_id === this.props.currentUserId && item.classification === 'bottom')
    const myShoes = this.props.items.filter(item => item.user_id === this.props.currentUserId && item.classification === 'shoes')

    const bepis = (e) => {

      let params = {}

      let shoeId = Array.from(e.target.previousSibling.previousSibling.children[0].children[0].children).filter(child => child.className === 'is-selected')[0].id

      let bottomId = Array.from(e.target.previousSibling.previousSibling.previousSibling.previousSibling.children[0].children[0].children).filter(child => child.className === 'is-selected')[0].id

      let topId = Array.from(e.target.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.children[0].children[0].children).filter(child => child.className === 'is-selected')[0].id

      params = {
          name: this.state.outfitName,
          user_id: this.props.currentUserId,
          topItem: topId,
          bottomItem: bottomId,
          shoesItem: shoeId
      }

      this.props.universalPostFunction(params, "NEW_OUTFIT")
    }

    return (
      <div>
        <form onSubmit={(e) => e.preventDefault()}><input
          type="text"
          name="outfitName"
          value={this.state.outfitName}
          onChange={this.handleChange}
        /></form>
        <Flickity
          className={'carousel'}
          elementType={'div'}
          options={flickityOptions}
        >
        {myTops.map(top => <img id={top.id} width="200px" src={top.image} />)}
        </Flickity>
        <br/>
        <Flickity
          className={'carousel'}
          elementType={'div'}
          options={flickityOptions}
        >
        {myBottoms.map(bottom => <img id={bottom.id} width="200px" src={bottom.image} />)}
        </Flickity>
        <br/>
        <Flickity
          className={'carousel'}
          elementType={'div'}
          options={flickityOptions}
        >
        {myShoes.map(shoe => <img id={shoe.id} width="200px" src={shoe.image} />)}
        </Flickity>
        <br />
        <button onClick={(e) => bepis(e)}>RATE MY FIT</button>
      </div>
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

export default connect(msp, mdp)(Slider);
