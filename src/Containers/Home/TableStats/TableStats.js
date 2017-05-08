import React, {Component} from 'react'

class TableStats extends Component {
  render () {
    // http://api.vattrack.org/Statistics/Last/5
    return (
      <table className='tablestats'>
        <tbody>
          <tr>
            <td>Flights Tracked</td>
            <td className='alignright'>{ this.props.general.get('isFetching') ? 'Loading...' : this.props.general.getIn(['stats', 'total']) }</td>
          </tr>
          <tr>
            <td>Airborne Flights</td>
            <td className='alignright'>{ this.props.general.get('isFetching') ? 'Loading...' : this.props.general.getIn(['stats', 'enroute']) }</td>
          </tr>
          <tr>
            <td>Departing Flights</td>
            <td className='alignright'>{ this.props.general.get('isFetching') ? 'Loading...' : this.props.general.getIn(['stats', 'departing']) }</td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default TableStats
