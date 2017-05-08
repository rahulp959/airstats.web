import fetch from 'isomorphic-fetch'
import Immutable from 'immutable'

export const REQUEST_RECENT = 'REQUEST_RECENT'
function requestRecent () {
  return {
    type: REQUEST_RECENT
  }
}
export const RECEIVE_RECENT = 'RECEIVE_RECENT'
function receiveRecent (json) {
  return {
    type: RECEIVE_RECENT,
    flights: json,
    receivedAt: Date.now()
  }
}

export function fetchRecent () {
  return function (dispatch) {
    dispatch(requestRecent())
    return fetch('https://api.vattrack.org/Statistics/Last/5')
      .then(response => response.json())
      .then(json =>
        dispatch(receiveRecent(Immutable.fromJS(json)))
    )
  }
}

export default function recent (state = Immutable.fromJS({ isFetching: false, flights: [] }), action) {
  switch (action.type) {
    case REQUEST_RECENT:
      return state.setIn(['isFetching'], true)
    case RECEIVE_RECENT:
      let newState = state.setIn(['isFetching'], false)
      newState = newState.setIn(['flights'], action.flights)
      return newState
    default:
      return state
  }
}
