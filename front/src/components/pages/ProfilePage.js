import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import ActionBar from '../components/ActionBar'


class ProfilePage extends React.Component {
  state = {}
  //LOAD USER DATA HERERERERERER
  // async componentDidMount() {
  //   const id = this.props.location.hash.substring(1)
  //   const bill = await getBillById(this.props.token, id)
  //   this.setState(() => (bill))
  // }
  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/login" />
    }
    return (
      <div className="page">
        <ActionBar activePage="profile" />
        <div className="page-content">
          <p>User Profile</p>
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

export default connect(mapStateToProps)(ProfilePage)