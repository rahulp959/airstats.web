import React, {Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import '../Search.scss'

class TableSearch extends Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }
  handleClick (e) {
    this.props.history.push(`/flight/${e.iz}`)
  }

  render () {
    // http://api.vattrack.org/Flights/{SearchTerm}
    return (
      <table className='searchbox'>
        <thead>
          <tr>
            <th colSpan='7' className='header'>Search Results</th>
          </tr>
          <tr className='titles'>
            <th>Ident</th>
            <th>Pilot</th>
            <th>Departure</th>
            <th>Destination</th>
            <th>Aircraft</th>
            <th>Departed At</th>
          </tr>
        </thead>
        <tbody>
          {(this.props.searchResults.get('isFetching')) ? <tr><td colSpan='2'>Loading...</td></tr>
          : this.props.searchResults.get('search').map((flight, i) => {
            let iz = flight.get('id')
            return (
              <tr onClick={() => this.handleClick({iz})} key={i}>
                <td>{flight.get('callsign')}</td>
                <td>{flight.get('pilot_name')}<br />{flight.get('vatsim_id')}</td>
                <td>{flight.get('dep')}<br />{flight.get('dep_name')}</td>
                <td>{flight.get('arr')}<br />{flight.get('arr_name')}</td>
                <td>{flight.get('aircraft_type')}</td>
                <td>{flight.get('departed_at')}</td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    )
  }
}

export default withRouter(connect()(TableSearch))
