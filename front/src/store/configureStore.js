import { createStore, combineReducers } from 'redux'
import billsReducer from '../reducers/bills'

export default () => {
  const store = createStore(
    combineReducers({
      bills: billsReducer
    })
  )
  return store
}