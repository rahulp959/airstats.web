import Immutable from 'immutable'
import { REQUEST_SEARCH, RECEIVE_SEARCH } from '../actions'

export default function search (state = Immutable.Map({isFetching: false, search: []}), action) {
  switch (action.type) {
    case REQUEST_SEARCH:
      return state.setIn(['isFetching'], true)
    case RECEIVE_SEARCH:
      let newState = state.setIn(['isFetching'], false)
      newState = newState.setIn(['search'], action.searchResults)
      return newState
    default:
      return state
  }
}
