import { combineReducers } from 'redux-immutable'
import { RECEIVE_GENERAL, REQUEST_GENERAL, REQUEST_RECENT, RECEIVE_RECENT } from '../actions'
import Immutable from 'immutable'

const app = combineReducers({
  general,
  recent
})

export default app

function general (state = Immutable.fromJS({ isFetching: false, departing: 0, enroute: 0, total: 0 }), action) {
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
