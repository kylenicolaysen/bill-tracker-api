import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import BillsList from '../components/BillsList'
import ActionBar from '../components/ActionBar'

const BillsDashboardPage = (props) => {
  if (!props.isAuthenticated) {
    return <Redirect to="/login" />
  }
  return (
    <div className="page">
      <ActionBar activePage="bills-dashboard" />
      <BillsList billsList = {props.billsList} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    billsList: state.bills
  }
}

export default connect(mapStateToProps)(BillsDashboardPage)