import React from 'react'

export default ({ id, description, amount }) => (
  <div>
    <h3>{description}</h3>
    <p>${amount}</p>
  </div>
)