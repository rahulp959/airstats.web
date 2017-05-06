import React from 'react'
import { connect } from 'react-redux'
import TableRecentFlights from './TableRecentFlights/TableRecentFlights'
import TableStats from './TableStats/TableStats'

class Home extends React.Component {
  render () {
    return (
      <div className='grid'>
        <div className='contentbox'>
          <div className='divrecentbox pad15'>
            <div className='centerblock'>recent</div>
            <div>
              <TableRecentFlights recent={this.props.recent} />
            </div>
          </div>
          <div className='newsbox pad15'>
            <div className='centerblock'>Number Statistics</div>
            <TableStats general={this.props.general} />
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    general: state.get('general'),
    recent: state.get('recent')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
