import { createStore, compose, applyMiddleware } from 'redux'
import { persistState } from 'redux-devtools'
import rootReducer from '../ducks'
import thunkMiddleware from 'redux-thunk'

let enhancer
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancer = compose(
    applyMiddleware(thunkMiddleware),
    persistState(getDebugSessionKey()),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // From extension docs
  )
} else {
  enhancer = compose(
    applyMiddleware(thunkMiddleware)
  )
}

function getDebugSessionKey () {
  // You can write custom logic here!
  // By default we try to read the key from ?debug_session=<key> in the address bar
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/)
  return (matches && matches.length > 0) ? matches[1] : null
}

export default function configureStore (initialState) {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  return createStore(rootReducer,
    initialState,
    enhancer)
}
