import fetch from 'isomorphic-fetch'
import Immutable from 'immutable'

/* Top 10 */
export const REQUEST_TOP10 = 'REQUEST_TOP10'
export const RECEIVE_TOP10 = 'RECEIVE_TOP10'

export function requestTop10 () {
  return {
    type: REQUEST_TOP10
  }
}

export function receiveTop10 (json) {
  return {
    type: RECEIVE_TOP10,
    flightData: json
  }
}

export function fetchTop10 () {
  return function (dispatch) {
    dispatch(requestTop10())
    return fetch(`https://api.airstats.org/Statistics/Top10`)
      .then(response => response.json())
      .then(json =>
        dispatch(receiveTop10(Immutable.fromJS(json)))
      )
  }
}

export default function top10 (state = Immutable.fromJS({ isFetching: true, top10: { data: [] } }), action) {
  switch (action.type) {
    case REQUEST_TOP10:
      return state.setIn(['isFetching'], true)
    case RECEIVE_TOP10:
      let newState = state.setIn(['isFetching'], false)
      newState = newState.setIn(['top10', 'data'], action)
      return newState
    default:
      return state
  }
}
