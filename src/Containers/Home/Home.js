import React from 'react'
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
              <TableRecentFlights />
            </div>
          </div>
          <div className='newsbox pad15'>
            <div className='centerblock'>Number Statistics</div>
            <TableStats />
          </div>
        </div>
      </div>
    )
  }
}

export default Home
