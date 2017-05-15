import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './Footer.scss'

class Footer extends Component {
  render () {
    return (
      <footer>
        © 2017 by Daniel A. Hawton and Rahul A. Parkar. All Rights Reserved. <Link to='/privacy'>Privacy</Link> | <Link to='/faq'>FAQs</Link> | <a href='https://www.aircharts.org'>AirCharts</a> | <a href='https://github.com/rahulp959/airstats'>GitHub</a>
      </footer>
    )
  }
}

export default Footer
