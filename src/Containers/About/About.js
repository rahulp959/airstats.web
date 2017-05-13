import React from 'react'
import './About.scss'

const About = () => (
  <div className='aboutbox'>
    <h2>About AirStats</h2>
    <p>AirStats was started by Daniel A. Hawton and Rahul A. Parkar to build off of the abandoned vataware project for the <a href='https://www.vatsim.net'>VATSIM Network</a>.
      Its intent was to facilitate learning, practicing and progressing knowledge and practice of ReactJS, Redux, React Router, AJAX, REST APIs and other programming techniques.</p>
    <p>The intent is to provide historical flight information for flights conducted on the <a href='https://www.vatsim.net'>VATSIM Network</a>.  Flights logged must be: connected
      to the network throughout the flight, begin at their departure airport and land at their arrival airport.  Flights that disconnect from the network or connect away from their
      departure airport will not be logged.</p>
  </div>
)

export default About
