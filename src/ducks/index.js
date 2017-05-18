import { combineReducers } from 'redux-immutable'
import recent from './recent'
import general from './general'
import liveflights from './liveflights'
import search from './search'
import flight from './flight'
import analyzer from './routes'

const app = combineReducers({
  flight,
  general,
  liveflights,
  recent,
  analyzer,
  search
})

export default app
