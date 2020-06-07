import React, { Component } from 'react'
import styled from 'styled-components'

import NewsMap from './NewsMap'
import HeaderNavbar from './HeaderNavbar'
import FooterNabvar from './FooterNavbar'
import Keywords from './Keywords'
import Table from './Table'

import axios from 'axios'


const OverflowRow = styled.div`
  height: 500px;
  overflow-y: scroll;
`

const Row = styled.div`
  margin-top: 20px;
`

class News extends Component {

  constructor() {
    super()

    this.state = {      
      last_run: "",
      stories: [],
      version: 'v2',
      active: '01',
      activeKey: '',
      keywords: [],
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

    var stories  = axios.get('https://itsy-bitsy.io/newsy?category=protest')
    var keywords = axios.get(`http://localhost:5000/keywords?v=${this.state.version}`)

    Promise.all([stories, keywords]).then((resp) => {
      this.setState({
        stories: resp[0].data.stories,
        last_run: new Date(resp[0].data.date),
        keywords: resp[1].data.keywords
      })
    })

  }

  headerSelect = (event) => {

    event.preventDefault()

    let cameo_type = event.target.innerText.toLowerCase()
    let cameo_code = this.state.cameo[cameo_type]

    axios.get(`http://localhost:5000/newsy?category=${cameo_type}&v=${this.state.version}`).then((resp)=> {
      this.setState({
        stories: resp.data.stories,
        last_run: new Date(resp.data.date),
        active: cameo_code,
        version: this.state.version
      })
    })

  }

  footerSelect = (event) => {

    event.preventDefault()

    let v = event.target.innerText.toLowerCase()
    let c = Object.keys(this.state.cameo).find(key => this.state.cameo[key] === this.state.active)

    axios.get(`http://localhost:5000/newsy?category=${c}&v=${v}`).then((resp)=> {
      this.setState({
        stories: resp.data.stories,
        last_run: new Date(resp.data.date),
        active: this.state.active,
        version: v
      })
    })

  }

  keywordSelect = (event) => {

    event.preventDefault()

    let k = event.target.innerText.split(' ')[0]
    let c = Object.keys(this.state.cameo).find(key => this.state.cameo[key] === this.state.active)
    
    axios.get(`http://localhost:5000/newsy?category=${c}&v=${this.state.version}&keyword=${k}`).then((resp)=> {
      this.setState({
        stories: resp.data.stories,
        last_run: new Date(resp.data.date),
        active: this.state.active,
        version: this.state.version,
        activeKey: k.toLowerCase() 
      })


      // this.setState({
      //   stories: resp.data.stories,
      //   last_run: new Date(resp.data.date),
      //   active: this.state.active,
      //   version: v
      // })
    })

  }

  render() {
    return (
        <div>
          <HeaderNavbar data={this.state} navbarSelect={this.headerSelect} />
          <div className="container-fluid">
            <Row className="row">
              <div className="col-4">
                <NewsMap data={this.state}/>
              </div>
              <OverflowRow className="col-8">
                <Table data={this.state} />
              </OverflowRow>
            </Row>
            <Row className="row">
              <div className="col-12">
              <Keywords data={this.state} select={this.keywordSelect}/>
              </div>
            </Row>
          </div>
          <Row>
            <FooterNabvar data={this.state} navbarSelect={this.footerSelect} />
          </Row>
        </div>
    )
  }

}

export default News
