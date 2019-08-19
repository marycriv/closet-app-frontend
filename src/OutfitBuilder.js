import React from 'react';
import './flickity.css';
import Flickity from 'react-flickity-component';

import { connect } from 'react-redux';


class OutfitBuilder extends React.Component {

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

    const items = this.props.items.filter(item => {return item.user_id === this.props.currentUserId})

    const  myTops = items.filter(item => {return ['top', 'blouse', 'sweater'].includes(item.classification)})

    const  myBottoms = items.filter(item => {return ['bottom', 'trousers', 'jeans', 'skirt', 'shorts'].includes(item.classification)})

    const  myShoes = items.filter(item => {return item.classification === 'shoes'})

    const  myDresses = items.filter(item => {return ['dress', 'romper'].includes(item.classification)})

    // const myTops = this.props.items.filter(item => item.user_id === this.props.currentUserId && item.classification === 'top')
    //
    // const myBottoms = this.props.items.filter(item => item.user_id === this.props.currentUserId && item.classification === 'bottom')
    //
    // const myDresses = this.props.items.filter(item => item.user_id === this.props.currentUserId && item.classification === 'dress')
    //
    // const myShoes = this.props.items.filter(item => item.user_id === this.props.currentUserId && item.classification === 'shoes')

    // const followees = this.props.follows.filter(user => user.follower_id === this.props.currentUserId).map(follow => follow.followee)
    //
    // followees.push(this.props.user)
    //
    // const userHeads = followees.reverse()


    const threeItemOutfit = (e) => {

      let params = {}

      // let userId = document.getElementsByClassName('user is-selected')[0].id

      let shoeId = document.getElementsByClassName('shoes is-selected')[0].id

      let bottomId =
      document.getElementsByClassName('bottom is-selected')[0].id

      let topId = document.getElementsByClassName('top is-selected')[0].id

      params = {
          name: this.state.outfitName,
          user_id: this.props.currentUserId,
          ids: [topId, bottomId, shoeId]
      }

      this.props.universalPostFunction(params, "NEW_OUTFIT")
    }

    const twoItemOutfit = (e) => {

      let params = {}

      let shoeId = document.getElementsByClassName('shoes is-selected')[0].id

      let dressId = document.getElementsByClassName('dress is-selected')[0].id


      params = {
          name: this.state.outfitName,
          user_id: this.props.currentUserId,
          ids: [dressId, shoeId]
      }

      this.props.universalPostFunction(params, "NEW_OUTFIT")
    }

    return (
      <div>
        {/*<h2>Who is this outfit for?</h2>

        <Flickity
          className={'carousel'}
          elementType={'div'}
          options={flickityOptions}
        >
        {userHeads.map(user => <img id={user.id} width="200px" src={user.profile_picture} className="user" />)}
        </Flickity>*/}

        <button onClick={(e) => this.setState({dressMode: true, threeItemMode: false})}>DressMode</button>
        <button onClick={(e) => this.setState({dressMode: false, threeItemMode: true})}>ThreeItemMode</button>
        <form onSubmit={(e) => e.preventDefault()}><input
          type="text"
          name="outfitName"
          value={this.state.outfitName}
          onChange={this.handleChange}
          className="effect-4"
          autocomplete="off"
        /></form>
        {<div>
          {!this.state.dressMode ?
          <div className="ThreeItems">
          <Flickity
            className={'carousel'}
            elementType={'div'}
            options={flickityOptions}
          >
          {myTops.map(top => <img id={top.id} src={top.image} className="carousel-image top" />)}
          </Flickity>
          <br/>
          <Flickity
            className={'carousel'}
            elementType={'div'}
            options={flickityOptions}
          >
          {myBottoms.map(bottom => <img id={bottom.id} src={bottom.image} className="bottom carousel-image" />)}
          </Flickity>
          <br/>
          <Flickity
            className={'carousel'}
            elementType={'div'}
            options={flickityOptions}
          >
          {myShoes.map(shoe => <img id={shoe.id} src={shoe.image} className="carousel-image shoes" />)}
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
            {myDresses.map(dress => <img id={dress.id} src={dress.image} className="carousel-image dress" />)}
            </Flickity>
            <br/>
            <Flickity
              className={'carousel'}
              elementType={'div'}
              options={flickityOptions}
            >
            {myShoes.map(shoe => <img id={shoe.id} src={shoe.image} className="carousel-image shoes" />)}
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
    items: state.items,
    user: state.user,
    follows: state.follows
  }
}

function mdp(dispatch){
  return {
  }
}

export default connect(msp, mdp)(OutfitBuilder);
