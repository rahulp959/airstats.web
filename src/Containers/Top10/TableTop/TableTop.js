import React from 'react'

export default class TableTop extends React.Component {
  render () {
    console.dir(this.props.data)
    return (
      <table className='tableTop'>
        <tbody>
          {this.props.data.map((apt, i) => {
            return (
              <tr key={i}>
                <td>{apt.get('icao')}</td>
                <td>{apt.get('count')}</td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    )
  }
}
