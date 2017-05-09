import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Map, Marker, Popup, TileLayer, Polyline} from 'react-leaflet'
import {DivIcon} from 'leaflet'
import './Flight.scss'

import { fetchFlightPosition, fetchFlightData } from '../../ducks/flight'

import FlightProgress from './FlightProgress/FlightProgress'

import planeUrl from './plane.png'

let dataDispatcher, positionDispatcher

class Flight extends React.Component {
  componentDidMount () {
    this.props.dispatch(fetchFlightPosition(this.props.match.params.flightId))
    this.props.dispatch(fetchFlightData(this.props.match.params.flightId))

    dataDispatcher = setInterval(() => this.props.dispatch(fetchFlightData(this.props.match.params.flightId)), 60000)
    positionDispatcher = setInterval(() => this.props.dispatch(fetchFlightPosition(this.props.match.params.flightId)), 60000)
  }

  componentWillUnmount () {
    clearInterval(dataDispatcher)
    clearInterval(positionDispatcher)
  }

  renderMap () {
    let firstPosition = this.props.flightPositions.first()
    let bounds = [[0, 0], [90, 180]]
    if (this.props.flightData.get('status') !== 'Arrived') {
      firstPosition = this.props.flightPositions.last()
    } else {
      let lastPosition = this.props.flightPositions.last()
      if (firstPosition && lastPosition) {
        bounds = [
        [parseFloat(firstPosition.get('lat')), parseFloat(firstPosition.get('lon'))],
        [parseFloat(lastPosition.get('lat')), parseFloat(lastPosition.get('lon'))]
        ]
      }
    }

    const position = (firstPosition) ? [parseFloat(firstPosition.get('lat')), parseFloat(firstPosition.get('lon'))] : [51.505, -0.09]
    const map = (
      <Map center={position} maxZoom={11} zoom={6} bounds={bounds}>
        <TileLayer url='http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}' attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community' />
        <TileLayer url='http://stamen-tiles-{s}.a.ssl.fastly.net/toner-hybrid/{z}/{x}/{y}.png' attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' />
        {/* Re-enable if you want clickable markers */}
        {/* this.renderPositions() */}
        {this.renderPolyline()}
        {this.props.flightData.get('status') !== 'Arrived' && this.renderFinalPlane()}
      </Map>
    )

    return map
  }

  renderPositions () {
    return this.props.flightPositions.map(
      (position) =>
        <Marker opacity={0} position={[parseFloat(position.get('lat')), parseFloat(position.get('lon'))]} key={`${position.get('lat')}, ${position.get('lon')}`}>
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

  renderPolyline () {
    const positions = this.props.flightPositions.map(
      (position) => [parseFloat(position.get('lat')), parseFloat(position.get('lon'))]
    )

    return <Polyline positions={positions.toArray()} color='#ED8000' />
  }

  renderFinalPlane () {
    const lastPosition = this.props.flightPositions.last()

    const divIcon = new DivIcon({
      html: `<img src=${planeUrl} class=rotate-${lastPosition && lastPosition.get('hdg')} />`,
      iconSize: [32, 32]
    })

    return (lastPosition) ? <Marker position={[parseFloat(lastPosition.get('lat')), parseFloat(lastPosition.get('lon'))]} icon={divIcon} /> : null
  }

  render () {
    return (
      <div className='contentbox'>
        <div className='flightinfo'>
          <h2>{this.props.flightData.get('callsign')}</h2>
          <h3>{this.props.flightData.get('status')}</h3>
        </div>
        <FlightProgress flightData={this.props.flightData} />
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
                <td>{this.props.flightData.get('departed_at') ? this.props.flightData.get('departed_at') : 'Not Departed'}</td>
                <td>
                  {
                    (this.props.flightData.get('status') !== 'Arrived')
                      ? (<i>Estimated {this.props.flightData.get('arrival_est')}</i>)
                      : this.props.flightData.get('arrived_at')
                  }
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
        <div className='flightmap'>{this.renderMap()}</div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return { flightPositions: state.getIn(['flight', 'flight', 'positions']), flightData: state.getIn(['flight', 'flight', 'flightData']) }
}

export default connect(mapStateToProps)(Flight)
