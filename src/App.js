import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './Containers/Home/Home'
import Header from './Containers/Header/Header'
import './App.scss'

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path='/' component={Home} />
        </div>
      </Router>
    )
  }
}

export default App
