import fetch from 'isomorphic-fetch'

export const GET_GENERAL = 'GET_GENERAL'

export function getGeneral () {
  return {
    type: GET_GENERAL
  }
}

export const GET_RECENT = 'GET_RECENT'

export function getRecent () {
  return {
    type: GET_RECENT,
    count: 5
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
  console.log(json)
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
        dispatch(receiveRecent(json))
      )
  }
}
