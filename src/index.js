import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import Devtools from './Containers/Devtools/Devtools'
import Immutable from 'immutable'
import stats from './data/stats'

const store = configureStore(Immutable.Map(stats))

ReactDOM.render(
  <Provider store={store}>
    <div>
      <App />
      <Devtools />
    </div>
  </Provider>,
  document.getElementById('root')
)
