import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import SignupForm from '../components/SignupForm'
import { isAuthd, isNotAuthd } from '../../actions/authentication'


const SignupPage = (props) => {
  if (!props.isAuthenticated) {
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

export default connect(mapStateToProps)(SignupPage)