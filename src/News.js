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


class News extends Component {

  constructor() {
    super()

    this.state = {      
      last_run: "",
      stories: [],
      version: 'v2',
      active: '01',
      activeKey: undefined,
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
    var keywords = axios.get(`https://itsy-bitsy.io/keywords?v=${this.state.version}`)

    Promise.all([stories, keywords]).then((resp) => {
      this.setState({
        stories: resp[0].data.stories,
        last_run: new Date(resp[0].data.date),
        keywords: resp[1].data.keywords
      })
    })

  }

  getQueryURL(cameoType, version, keyword) {

    if (keyword === undefined) {
      return `https://itsy-bitsy.io/newsy?category=${cameoType}&v=${version}`
    } else {
      return `https://itsy-bitsy.io/newsy?category=${cameoType}&v=${version}&keyword=${keyword}`
    }

  }

  headerSelect = (event) => {

    event.preventDefault()

    let ct = event.target.innerText.toLowerCase()
    let cc = this.state.cameo[ct]
    let kw = this.state.activeKey

    let headerQuery = this.getQueryURL(ct, this.state.version, kw)

    axios.get(headerQuery).then((resp)=> {
      this.setState({
        stories: resp.data.stories,
        last_run: new Date(resp.data.date),
        activeKey: this.state.activeKey,
        active: cc,
        version: this.state.version
      })
    })

  }

  footerSelect = (event) => {

    event.preventDefault()

    let vr = event.target.innerText.toLowerCase()
    let ct = Object.keys(this.state.cameo).find(key => this.state.cameo[key] === this.state.active)

    let footerQuery = this.getQueryURL(ct, vr, this.state.activeKey)

    axios.get(footerQuery).then((resp)=> {
      this.setState({
        stories: resp.data.stories,
        last_run: new Date(resp.data.date),
        activeKey: this.state.activeKey,
        active: this.state.active,
        version: vr
      })
    })

  }

  keywordSelect = (event) => {

    event.preventDefault()

    let kw = event.target.innerText.split(' ')[0]
    let ct = Object.keys(this.state.cameo).find(key => this.state.cameo[key] === this.state.active)

    let keywordQuery = this.getQueryURL(ct, this.state.version, kw)
    
    axios.get(keywordQuery).then((resp)=> {
      this.setState({
        stories: resp.data.stories,
        last_run: new Date(resp.data.date),
        active: this.state.active,
        version: this.state.version,
        activeKey: kw.toLowerCase() 
      })

    })

  }

  keywordClear = (event) => {

    event.preventDefault()

    console.log('Clear')

    this.setState({
      stories: this.state.stories,
      last_run: this.state.last_run,
      active: this.state.active,
      version: this.state.version,
      activeKey: undefined
    })

  }

  render() {
    return (
        <div>
          <HeaderNavbar data={this.state} navbarSelect={this.headerSelect} />
          <div className="container-fluid">
            <div style={{marginTop: '20px'}} className="row">
              <div className="col-4">
                <NewsMap data={this.state}/>
              </div>
              <OverflowRow className="col-8">
                <Table data={this.state} />
              </OverflowRow>
            </div>
            <div className="col-12 row justify-content-center">
              <Keywords data={this.state} select={this.keywordSelect} clear={this.keywordClear} />
            </div>
              <div style={{marginTop: '20px'}} className="col-12 row justify-content-center">
                <FooterNabvar data={this.state} select={this.footerSelect} />
              </div>
          </div>
        </div>
    )
  }

}

export default News
