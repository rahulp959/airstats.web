import React from 'react'
import './Loading.scss'
import loadinganim from './loading.gif'

class Loading extends React.Component {
  render () {
    return (
      <div className='loading'>
        <img src={loadinganim} alt='Loading animation...' />
        <h3>Loading...</h3>
      </div>
    )
  }
}

export default Loading
