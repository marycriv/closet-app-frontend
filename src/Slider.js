import React from 'react';
import './flickity.css';
import Flickity from 'react-flickity-component';

import { connect } from 'react-redux';


class Slider extends React.Component {

  state = {
    outfitName: "Outfit name here",
    dressMode: false,
    threeItemMode: true
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  render(){

    const flickityOptions = {
        wrapAround: true,
        initialIndex: 2
    }

    const myTops = this.props.items.filter(item => item.user_id === this.props.currentUserId && item.classification === 'top')
    const myBottoms = this.props.items.filter(item => item.user_id === this.props.currentUserId && item.classification === 'bottom')

    const myDresses = this.props.items.filter(item => item.user_id === this.props.currentUserId && item.classification === 'dress')

    const myShoes = this.props.items.filter(item => item.user_id === this.props.currentUserId && item.classification === 'shoes')

    const threeItemOutfit = (e) => {

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

    const twoItemOutfit = (e) => {

      let params = {}

      let shoeId = Array.from(e.target.previousSibling.previousSibling.children[0].children[0].children).filter(child => child.className === 'is-selected')[0].id

      let dressId = Array.from(e.target.previousSibling.previousSibling.previousSibling.previousSibling.children[0].children[0].children).filter(child => child.className === 'is-selected')[0].id

      params = {
          name: this.state.outfitName,
          user_id: this.props.currentUserId,
          ids: [dressId, shoeId]
      }

      this.props.universalPostFunction(params, "NEW_OUTFIT")
    }

    return (
      <div>
        <button onClick={(e) => this.setState({dressMode: true, threeItemMode: false})}>DressMode</button>
        <button onClick={(e) => this.setState({dressMode: false, threeItemMode: true})}>ThreeItemMode</button>
        <form onSubmit={(e) => e.preventDefault()}><input
          type="text"
          name="outfitName"
          value={this.state.outfitName}
          onChange={this.handleChange}
        /></form>
        {<div>
          {!this.state.dressMode ?
          <div className="ThreeItems">
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
          <button onClick={(e) => threeItemOutfit(e)}>RATE MY FIT</button>
          </div>
          :
          <div className="TwoItems">
            <Flickity
              className={'carousel'}
              elementType={'div'}
              options={flickityOptions}
            >
            {myDresses.map(dress => <img id={dress.id} width="200px" src={dress.image} />)}
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
            <button onClick={(e) => twoItemOutfit(e)}>RATE MY FIT</button>
          </div>
        }
        </div>}

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
