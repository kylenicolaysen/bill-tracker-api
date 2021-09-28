export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_BILL':
      return [...state, action.bill]
    default:
      return state
  }
}