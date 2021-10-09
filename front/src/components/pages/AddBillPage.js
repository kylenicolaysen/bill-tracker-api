import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import BillForm from '../components/BillForm'

const AddBillPage = (props) => {
  if (!props.isAuthenticated) {
    return <Redirect to="/login" />
  }
  return (
    <div>
      <h1>Add Bill</h1>
      <BillForm userToken={props.token} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    token: state.authentication.token
  }
}

export default connect(mapStateToProps)(AddBillPage)