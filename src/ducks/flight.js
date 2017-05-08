import fetch from 'isomorphic-fetch'
import Immutable from 'immutable'

export const REQUEST_FLIGHT_POSITION = 'REQUEST_FLIGHT_POSITION'

export function requestFlightPosition () {
  return {
    type: REQUEST_FLIGHT_POSITION
  }
}

export const RECEIVE_FLIGHT_POSITION = 'RECEIVE_FLIGHT_POSITION'

export function receiveFlightPosition (json) {
  return {
    type: RECEIVE_FLIGHT_POSITION,
    positions: json
  }
}

export function fetchFlightPosition (flightId) {
  return function (dispatch) {
    dispatch(requestFlightPosition())
    return fetch(`https://api.vattrack.org/Flight/${flightId}/Positions`)
      .then(response => response.json())
      .then(json =>
        dispatch(receiveFlightPosition(Immutable.fromJS(json)))
    )
  }
}

export default function flight (state = Immutable.fromJS({ isFetching: true, flight: { positions: [] } }), action) {
  switch (action.type) {
    case REQUEST_FLIGHT_POSITION:
      return state.setIn(['isFetching'], true)
    case RECEIVE_FLIGHT_POSITION:
      // Let's break this motherfucker down,
      // First, we filter over the whole original list
      // This will result in our stripped out list.
      // Inside the predicate of the filter, take the value
      // and go find the last index of the same lat/lon pairing. (equal lat/lons = no movement.)
      // Once we find the last index, pass that value back to
      // the filter, which will compare it against the value
      // it's looking at's index. Filter goes from 0-2
      // Find last goes from 2-0, any discrepency in the indexes when matched = duplicate, so we remove it.
      let newPositions = action.positions.filter(
        (value, index, iter) => {
          return iter.findLastIndex(
            (origValue) => {
              return origValue.get('lat') === value.get('lat') && origValue.get('lon') === value.get('lon')
            }
          ) === index
        }
      )
      let newState = state.setIn(['isFetching'], false)
      newState = newState.setIn(['flight', 'positions'], newPositions)
      return newState
    default:
      return state
  }
}
