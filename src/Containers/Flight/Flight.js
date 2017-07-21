import React from 'react'
import {connect} from 'react-redux'
import {Map, Marker, Popup, TileLayer, Polyline} from 'react-leaflet'
import {DivIcon} from 'leaflet'
import './Flight.scss'
import ReactGA from 'react-ga'
import Loading from '../Loading/Loading'

import {fetchFlightPosition, fetchFlightData} from '../../ducks/flight'

import FlightProgress from './FlightProgress/FlightProgress'
import FlightDetails from './FlightDetails/FlightDetails'
import FlightData from './FlightData/FlightData'
import ActivityLog from './ActivityLog/ActivityLog'

import planeUrl from './plane.png'

let dataDispatcher,
  positionDispatcher

class Flight extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      id: ''
    }
  }

  componentDidMount () {
    this.setState({id: this.props.match.params.flightId})
    this.props.dispatch(fetchFlightPosition(this.props.match.params.flightId))
    this.props.dispatch(fetchFlightData(this.props.match.params.flightId))

    dataDispatcher = setInterval(() => {
      this.logDataRefresh()
      return this.props.dispatch(fetchFlightData(this.props.match.params.flightId))
    }, 60000)
    positionDispatcher = setInterval(() => this.props.dispatch(fetchFlightPosition(this.props.match.params.flightId)), 60000)
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps === undefined) {
      return
    }

    if (this.state.id !== this.props.match.params.flightId) {
      window.scrollTo(0, 0)
      this.props.dispatch(fetchFlightPosition(this.props.match.params.flightId))
      this.props.dispatch(fetchFlightData(this.props.match.params.flightId))
      this.setState({id: this.props.match.params.flightId})
    }
  }

  componentWillUnmount () {
    clearInterval(dataDispatcher)
    clearInterval(positionDispatcher)
  }

  logDataRefresh () {
    ReactGA.set({
      page: window.location.pathname + window.location.search
    })
    ReactGA.event({
      category: 'Flight',
      action: 'Updated flight position',
      value: parseInt(this.props.match.params.flightId)
    })
    return null
  }

  renderMap () {
    let firstPosition = this.props.flightPositions.first()
    let bounds = [
      [
        0, 0
      ],
      [90, 180]
    ]
    if (this.props.flightData.get('status') !== 'Arrived') {
      firstPosition = this.props.flightPositions.last()
    } else {
      let lastPosition = this.props.flightPositions.last()
      if (firstPosition && lastPosition) {
        bounds = [
          [
            parseFloat(firstPosition.get('lat')),
            parseFloat(firstPosition.get('lon'))
          ],
          [
            parseFloat(lastPosition.get('lat')),
            parseFloat(lastPosition.get('lon'))
          ]
        ]
      }
    }

    const position = (firstPosition)
      ? [
        parseFloat(firstPosition.get('lat')),
        parseFloat(firstPosition.get('lon'))
      ]
      : [51.505, -0.09]
    const map = (
      <Map center={position} maxZoom={11} zoom={6} bounds={bounds}>
        <TileLayer url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}' attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community' />
        <TileLayer url='https://stamen-tiles-{s}.a.ssl.fastly.net/toner-hybrid/{z}/{x}/{y}.png' attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' /> {/* Re-enable if you want clickable markers */}
        {/* this.renderPositions() */}
        {this.renderPolyline()}
        {this.props.flightData.get('status') !== 'Arrived' && this.renderFinalPlane()}
      </Map>
    )

    return map
  }

  renderPositions () {
    return this.props.flightPositions.map((position) => <Marker opacity={0} position={[
      parseFloat(position.get('lat')),
      parseFloat(position.get('lon'))
    ]} key={`${position.get('lat')}, ${position.get('lon')}`}>
      <Popup>
        <div>
          <span>Lat: {position.get('lat')}</span>
          <br />
          <span>Long: {position.get('lon')}</span>
        </div>
      </Popup>
    </Marker>)
  }

  renderPolyline () {
    const positions = this.props.flightPositions.map((position) => [
      parseFloat(position.get('lat')),
      parseFloat(position.get('lon'))
    ])

    return <Polyline positions={positions.toArray()} color='#ED8000' />
  }

  renderFinalPlane () {
    const lastPosition = this.props.flightPositions.last()

    const divIcon = new DivIcon({
      html: `<img src=${planeUrl} class=rotate-${lastPosition && lastPosition.get('hdg')} />`,
      iconSize: [32, 32]
    })

    return (lastPosition)
      ? <Marker position={[
        parseFloat(lastPosition.get('lat')),
        parseFloat(lastPosition.get('lon'))
      ]} icon={divIcon} />
      : null
  }

  render () {
    if (this.props.flightIsFetching >= 1) {
      return (
        <Loading />
      )
    } else {
      return (
        <div className='flight'>
          <div className='flightinfo'>
            <h2>{this.props.flightData.get('callsign')}</h2>
            <h3>{this.props.flightData.get('status')}</h3>
          </div>
          <FlightProgress flightData={this.props.flightData} />
          <div className='flightbox'>
            <div className='flightmap'>{this.renderMap()}</div>
            <div className='flightstrip'>
              <FlightDetails flightData={this.props.flightData} />
              <FlightData flightData={this.props.flightData} />
            </div>
          </div>
          <div className='history'>
            <h2>Activity Log</h2>
            <ActivityLog callsign={this.props.flightData.get('callsign')} />
          </div>
        </div>
      )
    }
  }
}
const mapStateToProps = state => {
  return {
    flightPositions: state.getIn(['flight', 'flight', 'positions']),
    flightData: state.getIn(['flight', 'flight', 'flightData']),
    flightIsFetching: state.getIn(['flight', 'isFetching'])
  }
}

export default connect(mapStateToProps)(Flight)
