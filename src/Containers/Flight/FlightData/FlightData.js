import React from 'react'
import { Link } from 'react-router-dom'

class FlightData extends React.Component {
  render () {
    return (
      <div className='flightdata'>
        <div className='dividedtitle'>Flight Data</div>
        <table>
          <tbody>
            <tr>
              <td>Pilot</td>
              <td>
                <Link to={`/search/${this.props.flightData.get('vatsim_id')}`}>{this.props.flightData.get('pilot_name')} ({this.props.flightData.get('vatsim_id')})</Link>
              </td>
            </tr>
            <tr>
              <td>Speed</td>
              <td>{this.props.flightData.get('spd')} knots</td>
            </tr>
            <tr>
              <td>Altitude</td>
              <td>{this.props.flightData.get('alt')} ft (Planned: {this.props.flightData.get('req_alt')} ft)</td>
            </tr>
            <tr>
              <td>Distance</td>
              <td>Direct {this.props.flightData.get('dist_direct')} nm (Remaining: {this.props.flightData.get('dist_remain')} nm)</td>
            </tr>
            <tr>
              <td>Route</td>
              <td>{this.props.flightData.get('route')}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default FlightData
