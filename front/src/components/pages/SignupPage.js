import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import SignupForm from '../components/SignupForm'
import { isAuthorized, isNotAuthorized } from '../../actions/isAuthorized'


const SignupPage = (props) => {
  if (!props.isAuthorized) {
    return (
      <div>
        <SignupForm 
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

export default connect(mapStateToProps)(SignupPage)