import React from 'react'
import {connect} from 'react-redux'
import { fetchSearch } from '../../ducks/search'
import TableSearch from './TableSearch/TableSearch'

class Search extends React.Component {
  componentDidMount () {
    this.props.dispatch(fetchSearch(this.props.match.params.searchTerm))
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.match.params.searchTerm !== nextProps.match.params.searchTerm) {
      nextProps.dispatch(fetchSearch(nextProps.match.params.searchTerm))
    }
  }

  render () {
    return (
      <div className='contentbox'>
        <TableSearch searchResults={this.props.searchResults} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    searchResults: state.get('search')
  }
}

export default connect(mapStateToProps)(Search)
