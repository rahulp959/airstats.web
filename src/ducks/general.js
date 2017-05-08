import fetch from 'isomorphic-fetch'
import Immutable from 'immutable'

export const REQUEST_GENERAL = 'REQUEST_GENERAL'

export function requestGeneral () {
  return {
    type: REQUEST_GENERAL
  }
}

export const RECEIVE_GENERAL = 'RECEIVE_GENERAL'

export function receiveGeneral (json) {
  return {
    type: RECEIVE_GENERAL,
    stats: json
  }
}

export function fetchGeneral () {
  return function (dispatch) {
    dispatch(requestGeneral())
    return fetch('https://api.vattrack.org/Statistics/General')
      .then(response => response.json())
      .then(json =>
        dispatch(receiveGeneral(Immutable.fromJS(json)))
    )
  }
}

export default function general (state = Immutable.fromJS({ isFetching: false, departing: 0, enroute: 0, total: 0 }), action) {
  switch (action.type) {
    case REQUEST_GENERAL:
      return state.setIn(['isFetching'], true)
    case RECEIVE_GENERAL:
      let newState = state.setIn(['isFetching'], false)
      newState = newState.setIn(['stats'], action.stats)
      return newState
    default:
      return state
  }
}
