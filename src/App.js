import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './Home'
import Last from './Last'
import Past from './Past'
import Itsy from './Itsy'


class App extends Component {

  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/last" component={Last} />
        <Route path="/past" component={Past} />
        <Route path="/itsy" component={Itsy} />
      </Router>
    )
  }

}

export default App
