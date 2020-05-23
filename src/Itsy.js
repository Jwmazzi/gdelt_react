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

class Itsy extends Component {

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
          <div className="row">
            <div className="col-6">
              <div class="input-group flex-nowrap">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="addon-wrapping">@</span>
                </div>
                <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping"></input>
              </div>
            </div>
            <div className="col-6">
            <div class="input-group mb-3">
              <div class="custom-file">
                  <input type="file" class="custom-file-input" id="inputGroupFile02"></input>
                  <label class="custom-file-label" for="inputGroupFile02" aria-describedby="inputGroupFileAddon02">Choose file</label>
                </div>
                <div class="input-group-append">
                  <span class="input-group-text" id="inputGroupFileAddon02">Upload</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterNabvar />
      </div>
    )
  }

}

export default Itsy
