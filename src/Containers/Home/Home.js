import React from 'react'
import {connect} from 'react-redux'
import TableRecentFlights from './TableRecentFlights/TableRecentFlights'
import TableStats from './TableStats/TableStats'
import BgImg from './2zjkl80.jpg'

import { fetchRecent, fetchGeneral } from '../../actions'

let generalDispatcher, recentDispatcher
const refreshTime = 120000

class Home extends React.Component {
  componentDidMount () {
    this.props.dispatch(fetchGeneral())
    this.props.dispatch(fetchRecent())

    generalDispatcher = setInterval(() => this.props.dispatch(fetchGeneral()), refreshTime)
    recentDispatcher = setInterval(() => this.props.dispatch(fetchRecent()), refreshTime)
  }

  componentWillUnmount () {
    clearInterval(generalDispatcher)
    clearInterval(recentDispatcher)
  }

  render () {
    return (
      <div className='grid contentbox'>
        <div className='divrecentbox pad15' style={{backgroundImage: `url(${BgImg})`}}>
          <div className='centerblock'>recent</div>
          <TableRecentFlights recent={this.props.recent} />
        </div>
        <div className='newsbox pad15'>
          <div className='centerblock'>Number Statistics</div>
          <TableStats general={this.props.general} />
          <div className='centerblock alignright mt1r pr5' style={{textTransform: 'none'}}>Since Apr 30 2017</div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {general: state.get('general'), recent: state.get('recent')}
}

export default connect(mapStateToProps)(Home)
