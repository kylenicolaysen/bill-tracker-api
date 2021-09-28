import React from 'react'
import { Link } from 'react-router-dom'

export default class LoginPage extends React.Component {
  state = {
    loginError: false,
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
      console.log('failed')
      this.setState(() => ({ loginError: data.error }))
    }
    else {
      this.setState(() => ({token: data.token, loginError: false }))
      this.props.history.push('/');
    }
  }

  render() {
    return (
        <div className="auth__page">
          {this.state.loginError && <p className="auth__form__error">invalid email or password</p>}
          <form className="auth__form" onSubmit={ this.handleLoginFormSubmit }>
            <input placeholder="Email" className="auth__input" type="text" name="email" />
            <input placeholder="Password" className="auth__input" type="password" name="password" />
            <button className="primary__submit__button">Login</button>
          </form>
          <Link to="/signup"><button className="secondary__submit__button">Sign Up</button></Link>
        </div>        
    
    )
  }
}