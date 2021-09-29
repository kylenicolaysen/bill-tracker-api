import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Calendar from '../components/Calendar'

const CalendarPage = (props) => {
  if (props.isAuthenticated) {
    return (<Calendar />)
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

export default connect(mapStateToProps)(CalendarPage)