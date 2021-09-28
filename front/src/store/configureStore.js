import { createStore, combineReducers } from 'redux'
import billsReducer from '../reducers/bills'
import authorizedReducer from '../reducers/isAuthorized'

export default () => {
  const store = createStore(
    combineReducers({
      bills: billsReducer,
      authorization: authorizedReducer
    })
  )
  return store
}