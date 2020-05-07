import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './Home'
import News from './News'

class App extends Component {

  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/news" component={News} />
      </Router>
    )
  }

}

export default App
