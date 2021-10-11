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
      <BillsList userToken = {props.token} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    token: state.authentication.token
  }
}

export default connect(mapStateToProps)(BillsDashboardPage)