import React, {Component} from 'react'

class TableRecentFlights extends Component {
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
          <tr onClick={() => this.handleClick('1')}>
            <td>DAL123</td>
            <td className='alignright'>London Heathrow (EGLL) ► Boston International (KBOS)</td>
          </tr>
          <tr onClick={() => this.handleClick('2')}>
            <td>DAL123</td>
            <td className='alignright'>London Heathrow (EGLL) ► Boston International (KBOS)</td>
          </tr>
          <tr onClick={() => this.handleClick('3')}>
            <td>DAL123</td>
            <td className='alignright'>London Heathrow (EGLL) ► Boston International (KBOS)</td>
          </tr>
          <tr onClick={() => this.handleClick('4')}>
            <td>DAL123</td>
            <td className='alignright'>London Heathrow (EGLL) ► Boston International (KBOS)</td>
          </tr>
          <tr onClick={() => this.handleClick('5')}>
            <td>DAL123</td>
            <td className='alignright'>London Heathrow (EGLL) ► Boston International (KBOS)</td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default TableRecentFlights
