import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'
import { isAuthd, isNotAuthd } from '../../actions/authentication'

class LoginPage extends React.Component {
  formSubmit = ({ authSuccess, token }) => {
    authSuccess ? 
      this.props.dispatch(isAuthd(token)) : 
      this.props.dispatch(isNotAuthd())
  }

  render() {
    if(this.props.isAuthenticated) {
      return (
        <Redirect to="/" />
      )
    }
    else if (this.props.location.pathname === '/login') {
      return (
        <div>
          <LoginForm onSubmit={this.formSubmit} />
        </div>        
      )
    }
    else if (this.props.location.pathname === '/signup') {
      return (
        <div>
          <SignupForm
            onSubmit={this.formSubmit}
          />
        </div>        
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authentication.isAuthenticated
  }
}

export default connect(mapStateToProps)(LoginPage)