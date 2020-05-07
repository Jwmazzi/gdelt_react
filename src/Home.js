import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


const CenterImg = styled.img`
display: block;
margin-left: auto;
margin-right: auto;
margin-top: 100px;
width: 500px;
height: 500px;
`

class Home extends Component {

  render() {
    return (
      <Link to='/news'><CenterImg alt="Words" src="https://itsy-bitsy.io/words.png" /></Link>
    )
  }

}

export default Home
