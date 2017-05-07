import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from './logo.png'
import { withRouter } from 'react-router'

class Header extends Component {
  constructor (props) {
    super(props)

    this.state = {
      searchInput: ''
    }

    this.onSearch = this.onSearch.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
  }

  onSearchChange (event) {
    this.setState({
      searchInput: event.target.value
    })
  }

  onSearch (event) {
    event.preventDefault()
    if (this.state.searchInput !== '') {
      this.props.history.push(`/search/${this.state.searchInput}`)
    }
  }

  render () {
    return (
      <header id='topWrapper'>
        <div id='header' className='grid'>
          <div className='logoSearchContainer'>
            <div className='logoLeft'>
              <Link to='/'><img src={logo} alt='VatTrack' className='logo' /></Link>
            </div>
            <div id='headerSearchForm' className='headerTrack'>
              <form onSubmit={this.onSearch}>
                <input type='text' id='search' value={this.state.searchInput} onChange={this.onSearchChange} />
                <input type='submit' value='Search' className='button-skyblue' />
              </form>
            </div>
          </div>
          <nav className='navBar' role='navigation' aria-label='Navigation'>
            <ul id='navBarRoot' role='menubar'>
              <li role='menuitem'><Link to='/flight/map'>Live Flight Map</Link></li>
              <li><Link to='/statistics/route'>Route Analysis</Link></li>
              <li><Link to='/statistics'>Statistics</Link></li>
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

export default withRouter(connect()(Header))
