import React from 'react'
import './Privacy.scss'

class Privacy extends React.Component {
  render () {
    return (
      <div className='privacy'>
        <h2>Privacy Policy</h2>
        <h3>What information does AirStats collect and how is it used?</h3>
        <p>The collection of information is public based or information you give us.  The information we obtain includes, but is not limited to:
          <ul>
            <li>From VATSIM, we obtain your name, VATSIM ID and VATSIM flight details</li>
            <li>From your connect to us, your IP address, user agent and local time</li>
          </ul>
        </p>
        <p>The information is used to generate statistics of flights and website usage.  Connection information is shared with Google Analytics for use
          in analyzing traffic information and is anonymized, subject to their Privacy Policy.</p>
        <h3>IP Address, User Agent, Location data</h3>
        <p>When you connect to our website, your browser and connect give us your IP address, user agent string (which indicates your browser, operating system, etc.) and
            location information.  Location information can include your city and geographical area.  We use this information to improve our services and targeting.</p>
        <h3>Security</h3>
        <p>We have security protocols to ensure safety and security of the information we obtain.</p>
        <h3>Cookies</h3>
        <p>Google Analytics uses cookie information to link sessions together for traffic analysis purposes.  These cookies are restricted to AirStats and not shared with
          any other site, Google service or partners.</p>
        <h3>Information We Share</h3>
        <p>AirStats does not share any personal information with any companies, organizations, or individuals outside of AirStats except as listed in this policy or as required by law.</p>
      </div>
    )
  }
}

export default Privacy
