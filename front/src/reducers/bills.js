export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_BILL':
      return [...state, action.bill]
    case 'REMOVE_BILL':
      return state.filter((bill) => bill._id !== action._id)
    case 'SET_BILLS_LIST':
      return action.billsList
    default:
      return state
  }
}