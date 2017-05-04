import React, {Component} from 'react'

class TableStats extends Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }
  handleClick (e) {
    console.log(e)
  }

  render () {
    // http://api.vattrack.org/Statistics/Last/5
    return (
      <table className='tablerecentflights'>
        <tbody>
          <tr>
            <td>Flights Tracked</td>
            <td className='alignright'>2,123,123</td>
          </tr>
          <tr>
            <td>Airborne Flights</td>
            <td className='alignright'>123</td>
          </tr>
          <tr>
            <td>Departing Flights</td>
            <td className='alignright'>23</td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default TableStats
