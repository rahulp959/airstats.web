import React from 'react'
import './FAQ.scss'

class FAQ extends React.Component {
  render () {
    return (
      <div className='faq'>
        <h2>FAQ</h2>
        <h4>1. Why can I not find my flight on AirStats?</h4>
        <p>AirStats has a specific set of requirements to keep flights logged. These include, but are not limited to:
          <ul>
            <li>Your flight must be on VATSIM for the entire duration of your flight</li>
            <li>When it is first identified, it must be on the ground at the departure airport</li>
            <li>The flight must have a flight plan filed</li>
            <li>The flight cannot be absent from the data feed for longer than 5 fetchings (~5 minutes)</li>
          </ul>
        </p>
        <h4>2. Do you track ATC sessions?</h4>
        <p>The short answer is no.  While we would like to, along with online indications and notifications, the truth is the airspaces are complex, dynamic and constantly changing.
        The time required to collect, compile and keep updated is beyond what we have available at this present time.</p>
        <h4>3. Do you provide an API for public use?</h4>
        <p>No.  Our data is collected and analyzed for AirStats purposes only and is not available for automated or external consumption.</p>
        <h4>4. Is your code open source?</h4>
        <p>Yes.  Our front end is based off React in partnership by Daniel A. Hawton and Rahul A. Parkar and is available at <a href='https://www.github.com/rahulp959/airstats.web'>GitHub</a>.  The backend API is written by Daniel A. Hawton and utilizes Laravel.  The source code for the API
        is available at <a href='https://www.bitbucket.org/dhawton/airstats.api'>BitBucket</a>.  The data collection is handled by our parent site, AirCharts which is a VATSIM data feed mirror.  The source code for AirCharts is available at <a href='https://www.bitbucket.org/dhawton/aircharts3'>BitBucket</a>.</p>
        <h4>5. What are the licenses for your projects?</h4>
        <p>The airstats.web project (website) is GPLv3 licensed.  The airstats.api and aircharts3 code bases are MIT licensed.  Details on the licenses can be found in the respective repositories as linked above, or at <a href='https://opensource.org'>https://opensource.org</a>.</p>
      </div>
    )
  }
}

export default FAQ
