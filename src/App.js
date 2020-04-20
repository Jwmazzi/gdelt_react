import React, { Component } from 'react'
import NewsMap from './NewsMap'
import Navbar from './Navbar'
import Table from './Table'
import axios from 'axios'

class App extends Component {

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

    axios.get('http://localhost:5000/news').then((resp)=> {
      this.setState({
        stories: resp.data.stories,
        last_run: new Date(resp.data.date)
      })
    })

  }

  handleClick = (event) => {

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
    return (
      <div>
        <Navbar data={this.state} handleClick={this.handleClick}/>
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

export default App
