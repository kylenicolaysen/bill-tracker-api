import React from 'react'
import { Link, Redirect } from 'react-router-dom'

export default class SignupForm extends React.Component {
  state = {
    signupError: undefined,
    signupErrorCount: 0,
    token: ''
  }
  getErrorString(obj) {
    return Object.keys(obj).map(function(k) { return k }).join(' | ').toUpperCase()
  }

  handleSignupFormSubmit = async (e) => {
    e.preventDefault()
    const name = e.target.elements.name.value.trim()
    const email = e.target.elements.email.value.trim().toLowerCase()
    const password = e.target.elements.password.value.trim()
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })
    const data = await response.json()
    if (response.status === 400) {      
      this.setState(() => ({ signupErrorCount: this.state.signupErrorCount + 1, signupError: data.errors }))
    }
    else if (response.status === 200) {
      this.setState(() => ({ signupErrorCount: 0, signupError: undefined }))
      this.props.onSubmit({
        authSuccess: true,
        token: data.token
      })
      return <Redirect to="/" />
    }
  }
  render() {
    let error = ''
    if (this.state.signupError) {
      error = this.getErrorString(this.state.signupError)
    }
    return (
        <div className="page-content">
          {this.state.signupErrorCount === 0 && <span className="form--error hidden">~</span>}
          {(this.state.signupErrorCount > 0  && this.state.signupErrorCount < 5 ) && <span className="form--error">Please use valid: {error}</span>}
          {this.state.signupErrorCount > 4 && <span className="form--error">Come on, I believe in you!</span>}
          <form className="form" onSubmit={ this.handleSignupFormSubmit }>
            <input placeholder="Name" className="input" type="text" name="name" />
            <input placeholder="Email" className="input" type="text" name="email" />
            <input placeholder="Password" className="input" type="password" name="password" />
            <button className="primary__submit__button">Sign Up</button>
          </form>
          <Link to="/login"><button className="secondary__submit__button">Log In</button></Link>
        </div>            
    )
  }
}