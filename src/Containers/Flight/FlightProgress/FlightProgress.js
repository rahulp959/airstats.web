import React from 'react'
import he from 'he'

class FlightProgress extends React.Component {
  render () {
    return (
      <div className='flightprogress'>
        <div className='departure'>
          <span className='icao'>
            {this.props.flightData.get('dep')}
          </span><br />
          <span className='name'>
            {this.props.flightData.get('dep_name')}
          </span><br />
          <span className='location'>
            <span className='city'> {this.props.flightData.get('dep_city') && he.decode(this.props.flightData.get('dep_city'))}</span>,
            <span className='admin'> {this.props.flightData.get('dep_admin') && he.decode(this.props.flightData.get('dep_admin'))}</span>,
            <span className='country'> {this.props.flightData.get('dep_country')}</span>
          </span>
        </div>
        <div className='arrival'>
          <span className='icao'>
            {this.props.flightData.get('arr')}
          </span><br />
          <span className='name'>
            {this.props.flightData.get('arr_name')}
          </span><br />
          <span className='location'>
            <span className='city'> {this.props.flightData.get('arr_city') && he.decode(this.props.flightData.get('arr_city'))}</span>,
            <span className='admin'> {this.props.flightData.get('arr_admin') && he.decode(this.props.flightData.get('arr_admin'))}</span>,
            <span className='country'> {this.props.flightData.get('arr_country')}</span>
          </span>
        </div>
      </div>
    )
  }
}

export default FlightProgress
