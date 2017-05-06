import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

import { fetchRecent, fetchGeneral } from './actions'

import configureStore from './store/configureStore'
import Immutable from 'immutable'
import stats from './data/stats'

const store = configureStore(Immutable.Map(stats))

store.dispatch(fetchGeneral())
store.dispatch(fetchRecent())

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
)
