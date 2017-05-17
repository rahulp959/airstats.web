import fetch from 'isomorphic-fetch'
import Immutable from 'immutable'

export const REQUEST_ROUTES = 'REQUEST_ROUTES'
const requestRoutes = () => ({type: REQUEST_ROUTES})

export const RECEIVE_ROUTES = 'RECEIVE_ROUTES'
const receiveRoutes = (json) => {
  return {
    type: RECEIVE_ROUTES,
    routes: json
  }
}

export const fetchRoutes = (dep, dest) => {
  return (dispatch) => {
    dispatch(requestRoutes())
    return fetch(`https://api.airstats.org/Routes/${dep}/${dest}`)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveRoutes(Immutable.fromJS(json)))
      }
    )
  }
}

export default function analyzer (state = Immutable.Map({isFetching: false, routes: []}), action) {
  switch (action.type) {
    case REQUEST_ROUTES:
      return state.setIn(['isFetching'], true)
    case RECEIVE_ROUTES:
      let newState = state.setIn(['isFetching'], false)
      newState = newState.setIn(['routes'], action.routes)
      return newState
    default:
      return state
  }
}
