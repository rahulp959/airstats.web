import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import ReactGA from 'react-ga'

import About from './Containers/About/About'
import Privacy from './Containers/About/Privacy/Privacy'
import FAQ from './Containers/FAQ/FAQ'
import Flight from './Containers/Flight/Flight'
import Footer from './Containers/Footer/Footer'
import Header from './Containers/Header/Header'
import Home from './Containers/Home/Home'
import RouteAnalyzer from './Containers/RouteAnalyzer/RouteAnalyzer'
import Search from './Containers/Search/Search'
import NotFound from './Containers/NotFound/NotFound'
import './App.scss'

ReactGA.initialize('UA-99000586-1', {
  debug: false
})

const logPageView = () => {
  ReactGA.set({page: window.location.pathname + window.location.search})
  ReactGA.pageview(window.location.pathname + window.location.search)
  return null
}

const App = ({store}) => (
  <Provider store={store}>
    <Router>
      <div className='container'>
        <Route path='/' component={logPageView} />
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route exact path='/about/privacy' component={Privacy} />
          <Route exact path='/faq' component={FAQ} />
          <Route exact path='/flight/map' component={NotFound} />
          <Route path='/flight/:flightId' component={Flight} />
          <Route path='/search/:searchTerm' component={Search} />
          <Route path='/analyzer/:dep?/:dest?' component={RouteAnalyzer} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
    </Router>
  </Provider>
)

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App
