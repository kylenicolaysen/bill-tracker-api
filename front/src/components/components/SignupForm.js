import React from 'react'
import { Link, Redirect } from 'react-router-dom'

export default class SignupForm extends React.Component {
  state = {
    signupError: false,
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
      this.setState(() => ({ signupError: true }))
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
        <div className="auth__page">
          {this.state.signupError && <p className="auth__form__error">invalid signup info provided</p>}
          <form className="auth__form" onSubmit={ this.handleSignupFormSubmit }>
            <input placeholder="Name" className="auth__input" type="text" name="name" />
            <input placeholder="Email" className="auth__input" type="text" name="email" />
            <input placeholder="Password" className="auth__input" type="password" name="password" />
            <button className="primary__submit__button">Sign Up</button>
          </form>
          <Link to="/login"><button className="secondary__submit__button">Log In</button></Link>
        </div>            
    )
  }
}