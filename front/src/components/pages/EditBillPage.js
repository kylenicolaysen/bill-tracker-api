import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getBillById } from '../../api-calls/bills'
import BillForm from '../components/BillForm'
import ActionBar from '../components/ActionBar'


class EditBillPage extends React.Component {
  state = {}
  async componentDidMount() {
    const id = this.props.location.hash.substring(1)
    const bill = await getBillById(this.props.token, id)
    this.setState(() => (bill))
  }
  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/login" />
    }
    return (
      <div className="page">
        <ActionBar />
        <div className="page-content">
          <BillForm 
            bill={this.state.bill}
          />
        </div>
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

export default connect(mapStateToProps)(EditBillPage)