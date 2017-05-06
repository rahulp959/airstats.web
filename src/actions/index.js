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

export function fetchGeneral () {
  return function (dispatch) {
    dispatch(requestGeneral())
    return fetch('https://api.vattrack.org/Statistics/General')
      .then(response => response.json())
      .then(json =>
        dispatch(receiveGeneral(Immutable.fromJS(json))))
  }
}

export function fetchRecent () {
  return function (dispatch) {
    dispatch(requestRecent())
    return fetch('https://api.vattrack.org/Statistics/Last/5')
      .then(response => response.json())
      .then(json =>
        dispatch(receiveRecent(json)))
  }
}
