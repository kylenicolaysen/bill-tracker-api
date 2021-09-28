import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm'
import { isAuthorized, isNotAuthorized } from '../../actions/isAuthorized'

const LoginPage = (props) => {
  if (!props.isAuthorized) {
    return (
      <div>
        <LoginForm
          onSubmit={({ authSuccess, token }) => {
            authSuccess ? 
              props.dispatch(isAuthorized(token)) : 
              props.dispatch(isNotAuthorized())
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
    isAuthorized: state.authorization.isAuthorized
  }
}

export default connect(mapStateToProps)(LoginPage)