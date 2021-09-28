import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CalendarPage from '../components/pages/CalendarPage'
import LoginPage from '../components/pages/LoginPage.js'
import SignupPage from '../components/pages/SignupPage'
import NotFoundPage from '../components/pages/NotFoundPage'
import Header from '../components/components/Header'

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path='/' component={CalendarPage} exact />
        <Route path='/login' component={LoginPage} />
        <Route path='/signup' component={SignupPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default AppRouter