import React from 'react'
import {Link} from 'react-router-dom'

class AnalyzerTable extends React.Component {
  render () {
    let r = ''
    if (this.props.routes.get('routes').size === 0) {
      r = <p className='noflights'>No routes found within past 7 days</p>
    } else {
      r = (
        <table className='routes'>
          <thead>
            <tr>
              <th>Departed At</th>
              <th>Ident</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Aircraft Type</th>
              <th>Altitude</th>
              <th>Route</th>
            </tr>
          </thead>
          <tbody>
            {this.props.routes.get('routes').map((flight, i) => {
              let dts = flight.get('departed_at').toString().split(' ')
              return (
                <tr key={i}>
                  <td>{dts[0]}<br />{dts[1].substring(0, 5)}Z</td>
                  <td><Link to={`/flight/${flight.get('flight_id')}`}>{flight.get('callsign')}</Link></td>
                  <td>{flight.get('dep')}</td>
                  <td>{flight.get('arr')}</td>
                  <td>{flight.get('aircraft_type')}</td>
                  <td>{flight.get('altitude')}</td>
                  <td>{flight.get('route')}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )
    }
    return (
      <div>
        <p className='warning'>This data is for suggestion purposes only. Flights may not have been flown as filed, aircraft types may be erroneous or data may contain other errors.</p>
        {r}
      </div>
    )
  }
}

export default AnalyzerTable
