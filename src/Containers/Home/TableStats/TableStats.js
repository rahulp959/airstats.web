import React, {Component} from 'react'

class TableStats extends Component {
  render () {
    // http://api.vattrack.org/Statistics/Last/5
    return (
      <table className='tablerecentflights'>
        <tbody>
          <tr>
            <td>Flights Tracked</td>
            <td className='alignright'>{ this.props.general.isFetching ? 'Loading...' : this.props.general.stats.total }</td>
          </tr>
          <tr>
            <td>Airborne Flights</td>
            <td className='alignright'>{ this.props.general.isFetching ? 'Loading...' : this.props.general.stats.enroute }</td>
          </tr>
          <tr>
            <td>Departing Flights</td>
            <td className='alignright'>{ this.props.general.isFetching ? 'Loading...' : this.props.general.stats.departing }</td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default TableStats
