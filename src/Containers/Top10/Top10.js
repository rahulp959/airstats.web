import React from 'react'
import {connect} from 'react-redux'
import TableTop from './TableTop/TableTop'
import './Top10.scss'

import { fetchTop10 } from '../../ducks/top10.js'

let top10Dispatcher
const refreshTime = 60 * 30 * 1000 // Once per half-hour

class Top10 extends React.Component {
  componentDidMount () {
    this.props.dispatch(fetchTop10())

    top10Dispatcher = setInterval(() => this.props.dispatch(fetchTop10()), refreshTime)
  }

  componentWillUnmount () {
    clearInterval(top10Dispatcher)
  }

  render () {
    console.dir(this.props.top10)
    let html = ''
    if (this.props.top10.get('isFetching') === true) {
      html = 'Loading...'
    } else {
      html = (
        <div className='top10'>
          <div className='topbox'>
            <div className='title'>Top Departures</div>
            <TableTop data={this.props.top10.getIn(['data', 'departures'])} />
          </div>
          <div className='topbox'>
            <div className='title'>Top Arrivals</div>
            <TableTop data={this.props.top10.getIn(['data', 'arrivals'])} />
          </div>
        </div>
      )
    }
    return (
      <div className='topcontainer'>
        <p>Top 10 airports by types of operations within the past 7 days.</p>
        {html}
        <p>Last updated: {this.props.top10.getIn(['data', 'updated'])}Z</p>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    top10: state.get('top10')
  }
}

export default connect(mapStateToProps)(Top10)
