import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CalendarPage from '../components/pages/CalendarPage'
import AuthenticationPage from '../components/pages/AuthenticationPage'
import NotFoundPage from '../components/pages/NotFoundPage'
import Header from '../components/components/Header'

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path='/' component={CalendarPage} exact />
        <Route path='/login' component={AuthenticationPage} />
        <Route path='/signup' component={AuthenticationPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default AppRouter