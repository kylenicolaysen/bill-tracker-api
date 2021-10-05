import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getAllBills } from '../../api-calls/bills'

class BillsDashboardPage extends React.Component {
  state = {}
  async componentDidMount() {
    const id = this.props.location.hash.substring(1)
    const bills = await getAllBills(this.props.token)
    console.log(bills)
    this.setState(() => (bills))
  }

  getExpenses() {
    return
  }

  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/login" />
    }
    return (
      <div className="page">
        Bill Page
        <button onClick={this.getExpenses()}>Clack</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    token: state.authentication.token
  }
}

export default connect(mapStateToProps)(BillsDashboardPage)