import { combineReducers } from 'redux-immutable'
import recent from './recent'
import general from './general'
import search from './search'

const app = combineReducers({
  general,
  recent,
  search
})

export default app
