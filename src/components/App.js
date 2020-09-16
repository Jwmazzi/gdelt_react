import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from 'components/Home'
import News from 'components/News'


class App extends Component {

  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/news"   component={News} />
      </Router>
    )
  }

}

export default App
