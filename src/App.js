import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import About from './Containers/About/About'
import Flight from './Containers/Flight/Flight'
import Home from './Containers/Home/Home'
import Header from './Containers/Header/Header'
import Search from './Containers/Search/Search'
import './App.scss'

const App = ({store}) => (
  <Provider store={store}>
    <Router>
      <div>
        <Header />
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
        <Route path='/search/:searchTerm' component={Search} />
        <Route path='/flight/:flightId' component={Flight} />
      </div>
    </Router>
  </Provider>
)

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App
