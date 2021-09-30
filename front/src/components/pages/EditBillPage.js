import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


class EditBillPage extends React.Component {
  render() {
    const id = this.props.location.hash.substring(1)
    if (!this.props.isAuthenticated) {
      return <Redirect to="/login" />
    }
    return (
      <div>
        <h1>Bill Edit</h1>
        <p>{id}</p>
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