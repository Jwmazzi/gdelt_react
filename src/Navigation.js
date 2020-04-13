import React, { Component } from 'react'
import NewsMap from './NewsMap'
import Table from './Table'
import axios from 'axios'


class Navigation extends Component {

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

    this.handleClick = this.handleClick.bind(this)

  }

  componentDidMount() {

    axios.get('http://localhost:5000/news').then((resp)=> {
      this.setState({
        stories: resp.data.stories,
        last_run: new Date(resp.data.date)
      })
    })

  }

  handleClick(event) {

    event.preventDefault()

    let cameo_type = event.target.innerText.toLowerCase()
    let cameo_code = this.state.cameo[cameo_type]

    axios.get(`http://localhost:5000/news?category=${cameo_type}`).then((resp)=> {
      this.setState({
        stories: resp.data.stories,
        last_run: new Date(resp.data.date),
        active: cameo_code
      })
    })

  }

  render() {

    let tabs = Object.keys(this.state.cameo).map((info, i) => {
      return(
        <li key={i} className="nav-item">
          <a style={this.state.cameo[info] === this.state.active ? {color: 'white'} : {}} 
          className="nav-link" href={`?category=${info}`} onClick={this.handleClick}>{info.toUpperCase()}</a>
        </li>
      )
    })

    return (
      <div>
        {/* Generic Navbar Setup */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{marginBottom: 15}}>
          <button className="navbar-toggler" type="button" data-toggle="collapse">
              <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              {tabs}
            </ul>
          </div>
          <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <span style={{color: 'white'}}>{this.state.last_run.toString()}</span>
              </li>
            </ul>
          </div>
        </nav>
        {/* News Specific Component Starts Here */}
        <div className="container-fluid">
          <div className="row main-row">
            <div className="col-4">
              <NewsMap data={this.state}/>
            </div>
            <div className="col-8">
              <Table data={this.state} />
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default Navigation
