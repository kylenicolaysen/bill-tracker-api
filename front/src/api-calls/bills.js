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