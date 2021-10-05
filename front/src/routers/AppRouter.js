import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from '../components/components/Header'
import AuthenticationPage from '../components/pages/AuthenticationPage'
import AddBillPage from '../components/pages/AddBillPage'
import EditBillPage from '../components/pages/EditBillPage'
import CalendarPage from '../components/pages/CalendarPage'
import BillsDashboardPage from '../components/pages/BillsDashboardPage'
import NotFoundPage from '../components/pages/NotFoundPage'


const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path='/' component={CalendarPage} exact />
        <Route path='/login' component={AuthenticationPage} />
        <Route path='/signup' component={AuthenticationPage} />
        <Route path='/add-bill' component={AddBillPage} />
        <Route path='/bill' component={EditBillPage} />
        <Route path="/bills-dashboard" component={BillsDashboardPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default AppRouter