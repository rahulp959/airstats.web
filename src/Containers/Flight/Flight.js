import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import './Flight.scss'

import { fetchFlightPosition } from '../../ducks/flight'

class Flight extends React.Component {
  componentDidMount () {
    this.props.dispatch(fetchFlightPosition(27371))
  }

  componentWillUnmount () {
    // clearInterval(generalDispatcher)
  }

  renderMap () {
    const position = [51.505, -0.09]
    const map = (
      <Map center={position} maxZoom={11} zoom={10}>
        <TileLayer url='http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}' attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community' />
        <TileLayer url='http://stamen-tiles-{s}.a.ssl.fastly.net/toner-hybrid/{z}/{x}/{y}.png' attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' />
        {this.renderPositions()}
      </Map>
    )

    return map
  }

  renderPositions () {
    return this.props.flightPositions.map(
      (position) =>
        <Marker position={[parseFloat(position.get('lat')), parseFloat(position.get('lon'))]} key={`${position.get('lat')}, ${position.get('lon')}`}>
          <Popup>
            <div>
              <span>Lat: {position.get('lat')}</span>
              <br />
              <span>Long: {position.get('lon')}</span>
            </div>
          </Popup>
        </Marker>
    )
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
                <td>Actual/<i>Estimated</i>
                </td>
                <td>May 7, 2017 22:17</td>
                <td>
                  <i>May 8, 2017 02:11</i>
                </td>
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
                <td>
                  <Link to='/search/876594'>Daniel Hawton PAFA (876594)</Link>
                </td>
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
        <div className='flightmap'>{this.renderMap()}</div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {flightPositions: state.getIn(['flight', 'flight', 'positions']), recent: state.get('recent')}
}

export default connect(mapStateToProps)(Flight)
