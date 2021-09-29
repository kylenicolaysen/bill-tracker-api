import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import AddBillForm from '../components/AddBillForm'

const AddBillPage = (props) => {
  if (props.isAuthenticated) {
    return (<AddBillForm />)
  }
  else {
    return <Redirect to="/login" />
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authentication.isAuthenticated
  }
}

export default connect(mapStateToProps)(AddBillPage)