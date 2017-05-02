import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import Devtools from './Containers/Devtools/Devtools'
import Immutable from 'immutable'

const store = configureStore(Immutable.Map())

ReactDOM.render(
  <Provider store={store}>
    <div>
      <App />
      <Devtools />
    </div>
  </Provider>,
  document.getElementById('root')
)
