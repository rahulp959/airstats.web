import React from 'react'
import {connect} from 'react-redux'
import { fetchSearch } from '../../../ducks/search'
import FlightRow from './FlightRow/FlightRow'
import './ActivityLog.scss'

class ActivityLog extends React.Component {
  constructor (props) {
    super(props)

    this.state = {searchTerm: ''}
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.searchTerm !== nextProps.callsign) {
      nextProps.dispatch(fetchSearch(nextProps.callsign))
      this.setState({searchTerm: nextProps.callsign})
    }
  }

  render () {
    return (
      <table className='activitylog'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Aircraft</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {(this.props.searchResults.get('search').size === 0)
          ? <tr><td colSpan='5' className='noactivity'>No activity to display</td></tr>
          : this.props.searchResults.get('search').map((flight, i) => {
            let iz = flight.get('id')
            return (
              <FlightRow searchResult={flight} key={iz} />
            )
          })}
        </tbody>
      </table>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    searchResults: state.get('search'),
    flightData: state.getIn(['flight', 'flight', 'flightData'])
  }
}

export default connect(mapStateToProps)(ActivityLog)
