import Immutable from 'immutable'

export default function nameReducer (state = Immutable.Map(), action) {
  console.log(state, action)
  switch (action.type) {
    default:
      return state.setIn(['key'], 'value')
  }
}
