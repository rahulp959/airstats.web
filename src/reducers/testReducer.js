import Immutable from 'immutable'

export default function nameReducer (state = Immutable.Map(), action) {
  switch (action.type) {
    default:
      return state.setIn(['key'], 'value')
  }
}
