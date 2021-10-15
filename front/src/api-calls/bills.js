export const addNewBill = async (token, bill) => {
  console.log(bill)
  const response = await fetch('/api/expense', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ description: bill.description, amount: bill.amount, frequency: bill.frequency, date: bill.date })
  })
  const data = await response.json()
  return data
}

export const getBillById = async (token, id) => {
  const response = await fetch(`/api/expense/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'applicaion/json',
      'Authorization': `Bearer ${token}`
    }
  })
  const data = await response.json()
  return data
}

export const getAllBills = async (token) => {
  const response = await fetch('/api/expenses', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  const data = await response.json()
  return data
}

export const removeBillById = async (token, id) => {
  const response = await fetch(`/api/expense/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  const data = await response.json()
  return data
}