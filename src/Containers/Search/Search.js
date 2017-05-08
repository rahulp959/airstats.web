import React from 'react'
import {connect} from 'react-redux'
import { fetchSearch } from '../../actions'
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
      <div className='grid contentbox'>
        <div className='divrecentbox pad15'>
          <TableSearch searchResults={this.props.searchResults} />
        </div>
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