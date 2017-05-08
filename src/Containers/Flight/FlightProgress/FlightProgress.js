import React from 'react'

class FlightProgress extends React.Component {
  render () {
    return (
      <div className='flightprogress'>
        <div className='departure'>
          <span className='icao'>
            {this.props.flightData.get('dep')}
          </span>
          <span className='name'>
            {this.props.flightData.get('dep_name')}
          </span>
        </div>
        <div className='arrival'>
          <span className='icao'>
            {this.props.flightData.get('arr')}
          </span>
          <span className='name'>
            {this.props.flightData.get('arr_name')}
          </span>
        </div>
      </div>
    )
  }
}

export default FlightProgress
