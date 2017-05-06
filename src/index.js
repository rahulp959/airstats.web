import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

import configureStore from './store/configureStore'
import Immutable from 'immutable'

const store = configureStore(Immutable.Map())

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
)
