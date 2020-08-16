import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import NewVideo from './new-video'
import Navbar from './navbar'

class Routes extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={Navbar} />
        <Route path="/rooms/:roomId" component={NewVideo} />
      </Router>
    )
  }
}

export default Routes
