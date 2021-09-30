import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { isNotAuthd } from '../../actions/authentication'
import { addBill } from '../../actions/bills'
import { addNewBill } from '../../api-calls/bills'  

class ActionBar extends React.Component {
  handleAddButton = async () => {
    const bill = await addNewBill(this.props.token)
    if (bill) {
      this.props.dispatch(addBill(bill))
      this.props.history.push(`/bill#${bill._id}`);
    }
    
  }
  render() {
    return (
      <div className="action__bar">
        <button
          className="action__bar__button"
          onClick={this.handleAddButton}
        >Add Bill</button>
        <button
          className="action__bar__button--signout"
          onClick={() => {this.props.dispatch(isNotAuthd())}}
        >Sign Out</button>
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

export default withRouter(connect(mapStateToProps)(ActionBar))