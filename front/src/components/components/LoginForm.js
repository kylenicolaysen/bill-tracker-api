import React from 'react'
import { Link } from 'react-router-dom'

export default class LoginForm extends React.Component {
  state = {
    loginErrorCount: 0,
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
    if (response.status === 500 || response.status === 504) {
      return this.setState(() => ({ loginErrorCount: -1 }))
    }
    const data = await response.json()
    if (response.status === 400) {
      this.setState(() => ({ loginErrorCount: this.state.loginErrorCount + 1 }))
    }
    else if (response.status === 200) {
      this.setState(() => ({ loginErrorCount: 0 }))
      this.props.onSubmit({
        authSuccess: true,
        token: data.token
      })
    }
  }

  render() {
    return (
      <div className="page-content">
        {this.state.loginErrorCount === 0 && <p className="form--error hidden">~</p>}
        {this.state.loginErrorCount === -1 && <p className="form--error">Server Error ::: Please Try Again Later</p>}
        {(this.state.loginErrorCount > 0  && this.state.loginErrorCount < 3) && <p className="form--error">Invalid email or password</p>}
        {this.state.loginErrorCount > 2 && <p className="form--error">I'm starting to think you don't know your login info...</p>}
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