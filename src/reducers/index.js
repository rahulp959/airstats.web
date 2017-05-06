import { combineReducers } from 'redux-immutable'
import { GET_GENERAL, REQUEST_RECENT, RECEIVE_RECENT } from '../actions'
import testReducer from './testReducer'

const app = combineReducers({
  general,
  recent,
  testReducer
})

export default app

function general (state = { isFetching: false, departing: 0, enroute: 0, total: 0 }, action) {
  switch (action.type) {
    case GET_GENERAL:
      return Object.assign({}, state, {
        isFetching: true
      })
    default:
      return state
  }
}

function recent (state = { isFetching: false, test: 1 }, action) {
  switch (action.type) {
    case REQUEST_RECENT:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_RECENT:
      return Object.assign({}, state, {
        isFetching: false,
        flights: action.flights
      })
    default:
      return state
  }
}