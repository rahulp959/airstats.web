import { createStore, compose } from 'redux'
import rootReducer from '../reducers'

import stats from '../data/stats' // Temporary!! Need to get from API

const defaultState = {
  stats: stats
}

const store = createStore(rootReducer)

export default store
