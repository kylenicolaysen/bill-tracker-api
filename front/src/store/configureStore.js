import { createStore, combineReducers } from 'redux'
import billsReducer from '../reducers/bills'
import authenticationReducer from '../reducers/authentication'

export default () => {
  const store = createStore(
    combineReducers({
      bills: billsReducer,
      authentication: authenticationReducer
    })
  )
  return store
}