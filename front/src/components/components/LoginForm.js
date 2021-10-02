import React from 'react'
import { Link, Redirect } from 'react-router-dom'

export default class LoginForm extends React.Component {
  state = {
    loginError: 0,
    token: ''
  }
  handleLoginFormSubmit = async (e) => {
    e.preventDefault()
    const email = e.target.elements.email.value.trim().toLowerCase()
    const password = e.target.elements.password.value.trim()
    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    const data = await response.json()
    if (response.status === 400) {
      this.setState(() => ({ loginError: this.state.loginError + 1 }))
    }
    else {
      this.setState(() => ({ loginError: 0 }))
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
      {(this.state.loginError > 0  && this.state.loginError < 3) && <p className="form--error">Invalid email or password</p>}
        {this.state.loginError > 2 && <p className="form--error">I'm starting to think you don't know your login info...</p>}
        <form className="form" onSubmit={ this.handleLoginFormSubmit }>
          <input placeholder="Email" className="input" type="text" name="email" />
          <input placeholder="Password" className="input" type="password" name="password" />
          <button className="primary__submit__button">Login</button>
        </form>
        <Link to="/signup"><button className="secondary__submit__button">Sign Up</button></Link>
      </div>        
    )
  }
}