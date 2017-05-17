import React from 'react'
import {connect} from 'react-redux'
import {fetchRoutes} from '../../ducks/routes'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import './RouteAnalyzer.scss'

import AnalyzerTable from './AnalyzerTable/AnalyzerTable.js'

class RouteAnalyzer extends React.Component {
  constructor (props) {
    super(props)

    if (typeof this.props.match.params.dep !== 'undefined') {
      this.state = {
        searchDep: this.props.match.params.dep,
        searchDest: this.props.match.params.dest
      }
    } else {
      this.state = {
        searchDep: '',
        searchDest: ''
      }
    }

    this.onSearch = this.onSearch.bind(this)
    this.onDepChange = this.onDepChange.bind(this)
    this.onDestChange = this.onDestChange.bind(this)
  }

  componentDidMount () {
    if (typeof this.props.match.params !== 'undefined' && this.props.match.params.dep !== null && this.props.match.params.dest !== null) {
      this.props.dispatch(fetchRoutes(this.props.match.params.dep, this.props.match.params.dest))
    }
  }

  componentWillReceiveProps (nextProps) {
    if ((typeof this.props.match.params === 'undefined') ||
        (this.props.match.params.dep !== nextProps.match.params.dep) ||
        (this.props.match.params.dest !== nextProps.match.params.dest)) {
      window.scrollTo(0, 0)
      nextProps.dispatch(fetchRoutes(nextProps.match.params.dep, nextProps.match.params.dest))
      this.setState({
        searchDep: nextProps.match.params.dep,
        searchDest: nextProps.matchParams.dest
      })
    }
  }

  onDepChange (event) {
    this.setState({searchDep: event.target.value.toUpperCase()})
  }
  onDestChange (event) {
    this.setState({searchDest: event.target.value.toUpperCase()})
  }

  onSearch (event) {
    event.preventDefault()
    if (this.state.searchDep !== '' && this.state.searchDest !== '') {
      this.props.history.push(`/analyzer/${this.state.searchDep}/${this.state.searchDest}`)
    } else {
      alert('All fields required')
    }
  }

  render () {
    return (
      <div className='routeanalyzer'>
        <p>For flight simulation planning. Be certain to verify altitude, type and terminal procedures you are capable of flying.</p>
        <form onSubmit={this.onSearch}>
          <table>
            <thead>
              <tr>
                <th>Route Analyzer</th>
              </tr>
            </thead>
            <tbody>
              <tr className='hdr'>
                <td>Origin Airport</td>
              </tr>
              <tr>
                <td><input type='text' id='dep' placeholder='Dept ICAO' value={this.state.searchDep} onChange={this.onDepChange} /></td>
              </tr>
              <tr className='hdr'>
                <td>Destination Airport</td>
              </tr>
              <tr>
                <td><input type='text' id='dest' placeholder='Dest ICAO' value={this.state.searchDest} onChange={this.onDestChange} /></td>
              </tr>
              <tr>
                <td><input type='submit' value='Find Routes!' className='button' /></td>
              </tr>
            </tbody>
          </table>
        </form>
        {(typeof this.props.match.params.dep !== 'undefined') && <AnalyzerTable routes={this.props.analyzer} />}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    analyzer: state.get('analyzer')
  }
}

export default withRouter(connect(mapStateToProps)(RouteAnalyzer))
