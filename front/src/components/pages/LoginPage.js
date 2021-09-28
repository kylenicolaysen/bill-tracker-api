import React from 'react'
import { Link, Redirect } from 'react-router-dom'

export default class LoginPage extends React.Component {
  state = {
    loginError: false
  }
  // async handleLoginFormSubmit(e) {
  handleLoginFormSubmit = async (e) => {
    e.preventDefault()
    const email = e.target.elements.email.value.trim().toLowerCase()
    const password = e.target.elements.password.value.trim()
    const response = await fetch('/api/user/login', {
      method: 'POST',
      // mode: 'cors',
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
      // return <Redirect to="/" />
    }
  }

  render() {
    return (
        <div className="login__page">
          {this.state.loginError && <p>Invalid email or password.</p>}
          <form className="login__form" onSubmit={ this.handleLoginFormSubmit }>
            <input placeholder="Email" className="login__input" type="text" name="email" />
            <input placeholder="Password" className="login__input" type="password" name="password" />
            <button className="login__submit__button">Login</button>
          </form>
          <Link to="/signup"><button className="login__signup__button">Sign Up</button></Link>
        </div>        
    
    )
  }
}