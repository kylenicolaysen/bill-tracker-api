export const addBill = (bill) => ({
  type: 'ADD_BILL',
  ...bill
})

export const removeBill = (id) => ({
  type: 'REMOVE_BILL',
  id
})

export const setBillsList = (billsList) => ({
  type: 'SET_BILLS_LIST',
  billsList
})