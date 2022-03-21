import React from 'react'
import { Redirect } from 'react-router-dom' 
import { connect } from 'react-redux'
import { getAllBills } from '../../api-calls/bills'
import { setBillsList } from '../../actions/bills'
import BillsList from '../components/BillsList'
import ActionBar from '../components/ActionBar'

class BillsDashboardPage extends React.Component {
  getData() {
    if(this.props.token) {
      this._asyncRequest = getAllBills(this.props.token).then(
        externalData => {
          this._asyncRequest = null
          console.log(externalData)
          this.props.dispatch(setBillsList(externalData))
          // this.setState({ billList: externalData})
        }
      )
    }
    
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel()
    }
  }
  render() {
    {this.getData()}
    if (!this.props.isAuthenticated) {
      return <Redirect to="/login" />
    }
    return (
      <div className="page">
        <ActionBar activePage="bills-dashboard" />
        <BillsList />
      </div>
    )
  }
} 


const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
  }
}

export default connect(mapStateToProps)(BillsDashboardPage)