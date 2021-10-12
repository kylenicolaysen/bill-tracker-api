import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeBillById } from '../../api-calls/bills'
import { removeBill } from '../../actions/bills'

const BillListItem = ({token, _id, description, amount, createdAt, dispatch }) => {
  console.log()
  return (
    <div className="bill-item">
      <Link to={`/edit-bill/${_id}`}>  
        <h3>{description}</h3>
      </Link>
      <p>{amount} - {createdAt}</p>
      <button onClick={() => {
        removeBillById(token, _id)
        dispatch(removeBill(_id))
        push
    }}>Remove</button>
    </div>
  )
} 

export default connect()(BillListItem)