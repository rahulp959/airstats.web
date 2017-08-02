import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

class FlightRow extends React.Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    this.props.history.push(`/flight/${e.id}`)
  }

  render () {
    let d = new Date(this.props.searchResult.get('departed_at'))
    let day = days[d.getDay()]
    let depdate = []
    let arrdate = []
    let duration = ''
    if (this.props.searchResult.get('status') !== 'Arrived' && this.props.searchResult.get('status') !== 'Incomplete' && this.props.searchResult.get('status') !== null) {
      return null
    } else {
      if (this.props.searchResult.get('departued_at').toString() === '') {
        day = 'Unknown'
        depdate[1] = 'Unknown'
      } else {
        depdate = this.props.searchResult.get('departed_at').toString()
        depdate = depdate.split(' ')
        if (this.props.searchResult.get('status') === 'Arrived') {
          arrdate = this.props.searchResult.get('arrived_at').toString()
          arrdate = arrdate.split(' ')
          if (this.props.searchResult.get('duration_d') > 0) {
            duration = this.props.searchResult.get('duration_d') + 'd '
          }
          if (this.props.searchResult.get('duration_h') > 0) {
            duration = duration + this.props.searchResult.get('duration_h') + 'h '
          }
          if (this.props.searchResult.get('duration_m') > 0) {
            duration = duration + this.props.searchResult.get('duration_m') + 'm'
          }
        }
        depdate[1] = depdate[1].substring(0, 5) + 'Z'
      }
      if (this.props.searchResult.get('arrived_at').toString() === '') {
        arrdate[1] = 'Unknown'
      } else {
        arrdate[1] = arrdate[1].substring(0, 5) + 'Z'
      }
    }
    let id = this.props.searchResult.get('id')
    return (
      <tr onClick={() => this.handleClick({id})}>
        <td>{day}<br />{depdate[0]}</td>
        <td>{depdate[1]}
          <br />{this.props.searchResult.get('dep_name')}
          - {this.props.searchResult.get('dep')}</td>
        <td>{arrdate[1]}
          <br />{this.props.searchResult.get('arr_name')}
          - {this.props.searchResult.get('arr')}
        </td>
        <td>{this.props.searchResult.get('aircraft_type').toString().toUpperCase()}</td>
        <td>{(this.props.searchResult.get('status') === 'Arrived')
            ? duration
            : 'Not Arrived'}</td>
      </tr>
    )
  }
}

export default withRouter(connect()(FlightRow))
