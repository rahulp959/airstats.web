import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import './Flight.scss'

class Flight extends React.Component {
  componentDidMount () {
    // generalDispatcher = setInterval(() => this.props.dispatch(fetchGeneral()), refreshTime)
  }

  componentWillUnmount () {
    // clearInterval(generalDispatcher)
  }

  render () {
    return (
      <div className='contentbox'>
        <div className='flightinfo'>
          <h2>ASA55</h2>
          <h3>En-Route</h3>
        </div>
        <div className='flightprogress'>
          <div className='departure'>
            <span className='icao'>
              PANC
            </span>
            <span className='name'>
              Anchorage International
            </span>
          </div>
          <div className='arrival'>
            <span className='icao'>
              PABR
            </span>
            <span className='name'>
              Barrow
            </span>
          </div>
        </div>
        <div className='flightdetails'>
          <div className='dividedtitle'>Flight Times</div>
          <table>
            <thead>
              <tr>
                <th>&nbsp;</th>
                <th>Departure</th>
                <th>Landing</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Actual/<i>Estimated</i></td>
                <td>May 7, 2017 22:17</td>
                <td><i>May 8, 2017 02:11</i></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='flightdata'>
          <div className='dividedtitle'>Flight Data</div>
          <table>
            <tbody>
              <tr>
                <td>Pilot</td>
                <td><Link to='/search/876594'>Daniel Hawton PAFA (876594)</Link></td>
              </tr>
              <tr>
                <td>Speed</td>
                <td>401 knots</td>
              </tr>
              <tr>
                <td>Altitude</td>
                <td>33234 ft (Planned: 33000 ft)</td>
              </tr>
              <tr>
                <td>Distance</td>
                <td>Direct 1344 nm (Remaining: 344 nm)</td>
              </tr>
              <tr>
                <td>Route</td>
                <td>DCT</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {general: state.get('general'), recent: state.get('recent')}
}

export default connect(mapStateToProps)(Flight)
