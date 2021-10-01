export const addNewBill = async (token) => {
  const response = await fetch('/api/expense', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ description: 'New William', amount: 50 })
  })
  const data = await response.json()
  return data
}

export const getBillById = async (token, id) => {
  const response = await fetch('/api/expense', {
    method: 'GET',
    headers: {
      'Content-Type': 'applicaion/json',
      'Authorization': `Bearer ${token}`
    }
  })
  const data = await response.json()
  return data
}