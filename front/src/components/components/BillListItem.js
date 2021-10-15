import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeBillById } from '../../api-calls/bills'
import { removeBill } from '../../actions/bills'



const BillListItem = ({token, _id, title, amount, createdAt, dispatch }) => {
  return (
    <div className="bill-item">
      <Link to={`/edit-bill/${_id}`}>  
        <h3>{title}</h3>
      </Link>
      <p>{amount} - {createdAt}</p>
      <button
        className="submit__button"
        onClick={async () => {
          await removeBillById(token, _id)
          dispatch(removeBill(_id))
    }}>Remove</button>
    </div>
  )
} 

export default connect()(BillListItem)