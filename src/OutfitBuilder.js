import React from 'react';
import './flickity.css';
import Flickity from 'react-flickity-component';

import { connect } from 'react-redux';

class OutfitBuilder extends React.Component {

  state = {
    outfitName: "Outfit name here",
    dressMode: false,
    threeItemMode: true,
    loading: true,
    selectedUserId: this.props.currentUserId,
    selectedUser: this.props.user
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentDidMount(){
    this.setState({loading: false})
  }

  handleClick = (e) => {

    this.setState({selectedUserId: parseInt(e.target.id), dressMode: false,
    threeItemMode: true, selectedUser: this.props.users.find(user => user.id === this.state.selectedUserId)}, () => console.log(this.state))
  }


  render(){

    const flickityOptions = {
        wrapAround: true,
        initialIndex: 0
    }

    let followees = this.props.follows.filter(follow => follow.follower_id === this.props.currentUserId).map(follow => follow.followee_id)


    let userOptions = this.props.users.filter(user => user.id === this.props.currentUserId || followees.includes(user.id)).filter(user => user.id !== parseInt(this.state.selectedUserId))

    let items = this.props.items.filter(item => {return item.user_id === this.state.selectedUserId})

    let  myTops = items.filter(item => {return ['top', 'blouse', 'sweater'].includes(item.classification)})

    let  myBottoms = items.filter(item => {return ['bottom', 'trousers', 'jeans', 'skirt', 'shorts'].includes(item.classification)})

    let  myShoes = items.filter(item => {return item.classification === 'shoes'})

    let  myDresses = items.filter(item => {return ['dress', 'romper'].includes(item.classification)})


    const threeItemOutfit = (e) => {

      let params = {}

      let shoeId = document.getElementsByClassName('shoes is-selected')[0].id

      let bottomId =
      document.getElementsByClassName('bottom is-selected')[0].id

      let topId = document.getElementsByClassName('top is-selected')[0].id

      params = {
          name: this.state.outfitName,
          user_id: this.props.currentUserId,
          author_id: this.props.currentUserId,
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
          author_id: this.props.currentUserId,
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
        {<div className="OutfitBuilderUsers">
        <p>Who is this outfit for?</p>
        {userOptions.map(user => <img width="100px" id={user.id} onClick={this.handleClick} src={user.profile_picture} />)}</div>}
        <button className="ProfileNavButton" onClick={(e) => this.setState({dressMode: true, threeItemMode: false})}>DressMode</button>
        <button className="ProfileNavButton" onClick={(e) => this.setState({dressMode: false, threeItemMode: true})}>ThreeItemMode</button>
        <form onSubmit={(e) => e.preventDefault()}><input
          type="text"
          name="outfitName"
          value={this.state.outfitName}
          onChange={this.handleChange}
          className="effect-4"
          autoComplete="off"
        /></form>
        {<div>
          <img className="carousel-image top" src={this.state.selectedUser.profile_picture} />
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
          <button className="SubmitOutfitButton" onClick={threeItemOutfit}>RATE MY FIT</button>
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
            <button className="SubmitOutfitButton" onClick={twoItemOutfit}>RATE MY FIT</button>
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
