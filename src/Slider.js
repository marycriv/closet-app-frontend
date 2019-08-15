import React from 'react';
import './flickity.css';
import Flickity from 'react-flickity-component'


const flickityOptions = {
    initialIndex: 0,
    wrapAround: true
}

function Slider() {
  return (
    <Flickity
      className={'carousel'}
      elementType={'div'}
      options={flickityOptions}
    >
      <img width="200px" src="https://d2h1pu99sxkfvn.cloudfront.net/b0/153222/537654437_xSdEzVnfCO/P0.jpg"/>
      <img width="200px" src="https://d2h1pu99sxkfvn.cloudfront.net/b0/153222/537680079_5Ah0DlgWvz/P0.jpg"/>
      <img width="200px" src="https://d2h1pu99sxkfvn.cloudfront.net/b0/153222/537660996_xdlpiu176k/P0.jpg"/>
    </Flickity>
  )
}

export default Slider
