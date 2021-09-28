import React from 'react'
import { Link } from 'react-router-dom'

export default class SignupPage extends React.Component {
  state = {
    signupError: false,
    token: ''
  }

  handleSignupFormSubmit = async (e) => {
    e.preventDefault()
    const username = e.target.element.username.value.trim()
    const email = e.target.elements.email.value.trim().toLowerCase()
    const password = e.target.elements.password.value.trim()
    const response = await fetch('/api/user', {
      method: 'POST',
      // mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    })
    const data = await response.json()
    if (response.status === 400) {
      console.log('failed')
      this.setState(() => ({ signupError: data.error }))
    }
    else {
      this.setState(() => ({token: data.token, signupError: false }))
      this.props.history.push('/');
      // return <Redirect to="/" />
    }
  }

  render() {
    return (
        <div className="auth__page">
          {this.state.signupError && <p className="auth__form__error">invalid signup info provided</p>}
          <form className="auth__form" onSubmit={ this.handleLoginFormSubmit }>
            <input placeholder="Name" className="auth__input" type="text" name="username" />
            <input placeholder="Email" className="auth__input" type="text" name="email" />
            <input placeholder="Password" className="auth__input" type="password" name="password" />
            <button className="primary__submit__button">Sign Up</button>
          </form>
          <Link to="/login"><button className="secondary__submit__button">Log In</button></Link>
        </div>            
    )
  }
}