import React, {Component} from 'react'
import logo from './logo.png'

class Header extends Component {
  render () {
    return (
      <header id='topWrapper'>
        <div id='header'>
          <div className='logoLeft push-left'>
            <a href='/'><img src={logo} alt='VatTrack' className='logo' /></a>
          </div>
          <div id='headerSearchForm' className='headerTrack'>
            <form>
              <input type='text' id='search' />
              <input type='submit' value='Search' className='button-skyblue' />
            </form>
          </div>
          <nav className='navBar' role='navigation' aria-label='Navigation'>
            <ul id='navBarRoot' role='menubar'>
              <li role='menuitem'><a href='/'>Live Flight Map</a></li>
              <li role='menuitem'><a href='/'>Route Statistics</a></li>
              <li role='menuitem'><a href='/'>Flight Search</a></li>
              <li role='menuitem'><a href='/'>About Vattrack</a></li>
              <li role='menuitem'><a href='https://www.aircharts.org'>AirCharts</a></li>
            </ul>
          </nav>
        </div>
      </header>
    )
  }
}

export default Header
