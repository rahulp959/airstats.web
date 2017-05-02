import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import logo from './logo.png'

class Header extends Component {
  render () {
    return (
      <header id='topWrapper'>
        <div id='header' className="grid">
          <div className='logoSearchContainer'>
            <div className='logoLeft'>
              <a href='/'><img src={logo} alt='VatTrack' className='logo' /></a>
            </div>
            <div id='headerSearchForm' className='headerTrack'>
              <form>
                <input type='text' id='search' />
                <input type='submit' value='Search' className='button-skyblue' />
              </form>
            </div>
          </div>
          <nav className='navBar' role='navigation' aria-label='Navigation'>
            <ul id='navBarRoot' role='menubar'>
              <li role='menuitem'><Link to='/flight/map'>Live Flight Map</Link></li>
              <li role='menuitem'><Link to='/statistics/route'>Route Statistics</Link></li>
              <li role='menuitem'><Link to='/flight/search'>Flight Search</Link></li>
              <li role='menuitem'><Link to='/about'>About Vattrack</Link></li>
              <li role='menuitem'><a href='https://www.aircharts.org'>AirCharts</a></li>
            </ul>
          </nav>
        </div>
      </header>
    )
  }
}

export default Header
