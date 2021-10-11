import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getAllBills } from '../../api-calls/bills'
import BillListItem from './BillListItem.js'

class BillsList extends React.Component {
  state = {
    billList: null
  }
  componentDidMount() {
    this._asyncRequest = getAllBills(this.props.token).then(
      externalData => {
        this._asyncRequest = null
        this.setState({ billList: externalData})
      }
    )
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel()
    }
  }

  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/login" />
    }
    if (this.state.billList === null) {
      return (
        <div className="page-content">
          <h3>Add a Bill to Get Started</h3>
        </div>
      )
    } else {
      console.log(this.state)
      return (
        <div className="page-content">
          {
            this.state.billList.map((bill) => (
              <BillListItem key={bill._id} {...bill} />
            ))
          }
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    token: state.authentication.token
  }
}

export default connect(mapStateToProps)(BillsList)