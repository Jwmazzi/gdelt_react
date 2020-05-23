import React, { Component } from 'react'
import styled from 'styled-components'

import NewsMap from './NewsMap'
import Navbar from './Navbar'
import FooterNabvar from './FooterNavbar'
import Table from './Table'

import axios from 'axios'


const OverflowRow = styled.div`
  height: 500px;
  overflow-y: scroll;
`

class Last extends Component {

  constructor() {
    super()

    this.state = {      
      last_run: "",
      stories: [],
      active: '14',
      cameo: {
        comment:   '01',
        cooperate: '03',
        consult:   '04',
        aid:       '07',
        protest:   '14',
        assault:   '18',
        fight:     '19'
      }
    }
  }

  componentDidMount() {

    axios.get('https://itsy-bitsy.io/newsy?category=protest').then((resp)=> {
      this.setState({
        stories: resp.data.stories,
        last_run: new Date(resp.data.date)
      })
    })

  }

  navbarSelect = (event) => {

    event.preventDefault()

    let cameo_type = event.target.innerText.toLowerCase()
    let cameo_code = this.state.cameo[cameo_type]

    axios.get(`https://itsy-bitsy.io/newsy?category=${cameo_type}`).then((resp)=> {
      this.setState({
        stories: resp.data.stories,
        last_run: new Date(resp.data.date),
        active: cameo_code
      })
    })

  }

  render() {
    return (
        <div>
          <Navbar data={this.state} navbarSelect={this.navbarSelect}/>
          <div className="container-fluid">
            <div className="row main-row">
              <div className="col-4">
                <NewsMap data={this.state}/>
              </div>
              <OverflowRow className="col-8">
                <Table data={this.state} />
              </OverflowRow>
            </div>
          </div>
          <FooterNabvar />
        </div>
    )
  }

}

export default Last
