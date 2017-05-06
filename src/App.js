import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import Home from './Containers/Home/Home'
import Header from './Containers/Header/Header'
import About from './Containers/About/About'
import './App.scss'

const App = ({store}) => (
  <Provider store={store}>
    <Router>
      <div>
        <Header />
        <Route exact path='/' component={Home} />
        <Route exact path='/about' component={About} />
      </div>
    </Router>
  </Provider>
)

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App
