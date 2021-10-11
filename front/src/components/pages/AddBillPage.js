import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import BillForm from '../components/BillForm'
import ActionBar from '../components/ActionBar'

const AddBillPage = (props) => {
  if (!props.isAuthenticated) {
    return <Redirect to="/login" />
  }
  return (
    <div className="page">
      <ActionBar activePage="add-bill" />
      <div className="page-content">
        <h1>Add New Bill</h1>
        <BillForm userToken={props.token} />
      </div>
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