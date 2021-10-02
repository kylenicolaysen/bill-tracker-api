import React from 'react'
import { Link, Redirect } from 'react-router-dom'

export default class SignupForm extends React.Component {
  state = {
    signupError: 0,
    token: ''
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
      this.setState(() => ({ signupError: signupError + 1 }))
    }
    else {
      this.setState(() => ({ signupError: false }))
      this.props.onSubmit({
        authSuccess: true,
        token: data.token
      })
      return <Redirect to="/" />
    }
  }
  render() {

    return (
        <div className="page">
          {(this.state.signupError > 0  && this.state.signupError < 5 ) && <p className="form--error">Please use a valid name, email and password.</p>}
          {this.state.signupError > 4 && <p className="form--error">Really? It's taking you this many tries?</p>}
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