import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm'
import { isAuthd, isNotAuthd } from '../../actions/authentication'

const LoginPage = (props) => {
  if (!props.isAuthenticated) {
    return (
      <div>
        <LoginForm
          onSubmit={({ authSuccess, token }) => {
            authSuccess ? 
              props.dispatch(isAuthd(token)) : 
              props.dispatch(isNotAuthd())
          }}
        />
      </div>        
    )
  }
  else {
    return (
      <Redirect to="/" />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authentication.isAuthenticated
  }
}

export default connect(mapStateToProps)(LoginPage)