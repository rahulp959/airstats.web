import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from './logo.png'
import { withRouter } from 'react-router'
import './Header.scss'

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
      <header>
        <div className='header grid'>
          <div className='logoSearchContainer'>
            <div className='logoLeft'>
              <Link to='/'><img src={logo} alt='VatTrack' className='logo' /></Link>
            </div>
            <div className='headerTrack'>
              <form onSubmit={this.onSearch}>
                <input type='text' className='search' value={this.state.searchInput} onChange={this.onSearchChange} />
                <input type='submit' value='Search' className='button' />
              </form>
            </div>
          </div>
          <nav role='navigation' aria-label='Navigation'>
            <ul role='menubar'>
              <li role='menuitem'><Link to='/flight/map'>Live Flight Map</Link></li>
              <li><Link to='/statistics/route'>Route Analysis</Link></li>
              <li><Link to='/statistics'>Statistics</Link></li>
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
