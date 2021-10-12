import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import BillListItem from './BillListItem.js'

const BillsList = (props) => {
  if (!props.isAuthenticated) {
    return <Redirect to="/login" />
  }
  if (props.billsList.length === 0) {
    return (
      <div className="page-content">
        <h3>Add a Bill to Get Started</h3>
      </div>
    )
  } else {
    return (
      <div className="page-content">
        {
          props.billsList.map((bill) => (
            <BillListItem key={bill._id} token={props.token} {...bill} />
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    token: state.authentication.token
  }
}

export default connect(mapStateToProps)(BillsList)