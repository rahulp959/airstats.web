import React, {Component} from 'react'

class TableSearch extends Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }
  handleClick (e) {
    console.log(e.iz)
  }

  render () {
    // http://api.vattrack.org/Flights/{SearchTerm}
    return (
      <table className='tableSearch'>
        <tbody>
          {(this.props.searchResults.get('isFetching')) ? <tr><td colSpan='2'>Loading...</td></tr>
          : this.props.searchResults.get('search').map((flight, i) => {
            let iz = flight.get('id')
            return (
              <tr onClick={() => this.handleClick({iz})} key={i}>
                <td>{flight.get('callsign')}</td>
                <td className='alignright'>{flight.get('depname')} ({flight.get('dep')}) ► {flight.get('arrname')} ({flight.get('arr')})</td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    )
  }
}

export default TableSearch
