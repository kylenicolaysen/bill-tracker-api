import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'
import { isAuthd, isNotAuthd } from '../../actions/authentication'

const LoginPage = (props) => {
  if(props.isAuthenticated) {
    return (
      <Redirect to="/" />
    )
  }
  else if (props.location.pathname === '/login') {
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
  else if (props.location.pathname === '/signup') {
    return (
      <div>
        <SignupForm
          onSubmit={({ authSuccess, token }) => {
            authSuccess ? 
              props.dispatch(isAuthd(token)) : 
              props.dispatch(isNotAuthd())
          }}
        />
      </div>        
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authentication.isAuthenticated
  }
}

export default connect(mapStateToProps)(LoginPage)