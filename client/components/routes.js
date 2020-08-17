import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import NewVideo from './new-video'
import Navbar from './navbar'
import Home from './home'

class Routes extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route path="/rooms/:roomId" component={NewVideo} />
      </Router>
    )
  }
}

export default Routes
