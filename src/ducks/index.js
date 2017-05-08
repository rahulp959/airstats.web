import { combineReducers } from 'redux-immutable'
import recent from './recent'
import general from './general'
import search from './search'
import flight from './flight'

const app = combineReducers({
  general,
  recent,
  search,
  flight
})

export default app
