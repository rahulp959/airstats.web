import fetch from 'isomorphic-fetch'
import Immutable from 'immutable'

/* Flight Data */
export const REQUEST_LIVE_FLIGHTS = 'REQUEST_LIVE_FLIGHTS'
export const RECEIVE_LIVE_FLIGHTS = 'RECEIVE_LIVE_FLIGHTS'

export function requestLiveFlights () {
  return {
    type: REQUEST_LIVE_FLIGHTS
  }
}

export function receiveLiveFlights (json) {
  return {
    type: RECEIVE_LIVE_FLIGHTS,
    flights: json
  }
}

export function fetchLiveFlights () {
  return function (dispatch) {
    dispatch(requestLiveFlights())
    return fetch(`https://api.airstats.org/Flights/Live`)
      .then(response => response.json())
      .then(json =>
        dispatch(receiveLiveFlights(Immutable.fromJS(json)))
      )
  }
}

export default function liveflights (state = Immutable.fromJS({ isFetching: true, flights: [] }), action) {
  switch (action.type) {
    case REQUEST_LIVE_FLIGHTS:
      return state.setIn(['isFetching'], true)
    case RECEIVE_LIVE_FLIGHTS:
      let newState = state.setIn(['isFetching'], false)
      newState = newState.setIn(['flights'], action.flights)
      return newState
    default:
      return state
  }
}
