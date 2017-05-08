import fetch from 'isomorphic-fetch'
import Immutable from 'immutable'

export const REQUEST_SEARCH = 'REQUEST_SEARCH'
const requestSearch = () => ({type: REQUEST_SEARCH})

export const RECEIVE_SEARCH = 'RECEIVE_SEARCH'
const receiveSearch = (json) => {
  return {
    type: RECEIVE_SEARCH,
    searchResults: json
  }
}

export const fetchSearch = (searchQuery) => {
  return (dispatch) => {
    dispatch(requestSearch())
    return fetch(`https://api.vattrack.org/Flights/${searchQuery}`)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveSearch(Immutable.fromJS(json)))
      }
    )
  }
}

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
