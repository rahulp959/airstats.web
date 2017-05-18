import React from 'react'
import {fetchLiveFlights} from '../../ducks/liveflights.js'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import './FlightMap.scss'
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import {DivIcon} from 'leaflet'
import planeUrl from '../Flight/plane.png'

let flightDispatcher

class FlightMap extends React.Component {
  componentDidMount () {
    this.props.dispatch(fetchLiveFlights())

    flightDispatcher = setInterval(() => this.props.dispatch(fetchLiveFlights()), 60000)
  }

  componentWillUnmount () {
    clearInterval(flightDispatcher)
  }

  flightTrack (id) {
    this.props.history.push(`/flight/${id}`)
  }

  renderMap () {
    const map = (
      <Map center={[0, 0]} maxZoom={11} zoom={2}>
        <TileLayer url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}' attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community' />
        <TileLayer url='https://stamen-tiles-{s}.a.ssl.fastly.net/toner-hybrid/{z}/{x}/{y}.png' attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' />
        {this.renderPositions()}
      </Map>
    )

    return map
  }

  renderPositions () {
    return this.props.flightPositions.map(
          (position) => {
            let divIcon = new DivIcon({
              html: `<img src=${planeUrl} class=rotate-${position && position.get('hdg')} />`,
              iconSize: [32, 32]
            })
            console.log(position.get('callsign'))
            return (
              <Marker opacity={1} position={[parseFloat(position.get('lat')), parseFloat(position.get('lon'))]} icon={divIcon} key={`${position.get('callsign')}`}>
                <Popup>
                  <div>
                    <span className='row1'>ID: {position.get('callsign')}</span><br />
                    <span className='row2'>ALT: {position.get('alt')}</span><br />
                    <span className='row3'>RTE: {position.get('dep')}-{position.get('arr')}</span><br />
                    <span className='row4'>GS: {position.get('spd')}</span><br /><br />
                    <a onClick={() => { this.flightTrack(position.get('id')) }} className='track'>Flight Track</a>
                  </div>
                </Popup>
              </Marker>
            )
          }
        )
  }

  render () {
    return (
      <div className='mapbox'>{this.renderMap()}</div>
    )
  }
}

const mapStateToProps = state => {
  return {
    flightPositions: state.getIn(['liveflights', 'flights'])
  }
}

export default withRouter(connect(mapStateToProps)(FlightMap))
