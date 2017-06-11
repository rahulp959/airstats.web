import { combineReducers } from 'redux-immutable'
import analyzer from './routes'
import flight from './flight'
import general from './general'
import liveflights from './liveflights'
import recent from './recent'
import search from './search'
import top10 from './top10'

const app = combineReducers({
  analyzer,
  flight,
  general,
  liveflights,
  recent,
  search,
  top10
})

export default app
