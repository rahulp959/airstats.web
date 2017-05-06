import { createStore, compose, applyMiddleware } from 'redux'
import { persistState } from 'redux-devtools'
import rootReducer from '../reducers'
import Devtools from '../Containers/Devtools/Devtools'
import thunkMiddleware from 'redux-thunk'
import { fetchRecent } from '../actions'

const enhancer = compose(
  // Required! Enable Redux DevTools with the monitors you chose
  Devtools.instrument(),
  // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
  persistState(getDebugSessionKey())
)

function getDebugSessionKey () {
  // You can write custom logic here!
  // By default we try to read the key from ?debug_session=<key> in the address bar
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/)
  return (matches && matches.length > 0) ? matches[1] : null
}

export default function configureStore (initialState) {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  const store = createStore(rootReducer, enhancer, applyMiddleware(thunkMiddleware))

  store.dispatch(fetchRecent()).then(() => console.log(store.getState()))

  return store
}
