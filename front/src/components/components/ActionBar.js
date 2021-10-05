import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { isNotAuthd } from '../../actions/authentication'

class ActionBar extends React.Component {
  render() {
    return (
      <div className="action__bar">
        <button
          className="action__bar__button"
          onClick={() => this.props.history.push('/add-bill')}
        >Add Bill</button>
        <button
          className="action__bar__button"
          onClick={() => this.props.history.push('/bills-dashboard')}
        >View Expenses</button>
        <button
          className="action__bar__button--signout"
          onClick={() => {this.props.dispatch(isNotAuthd())}}
        >Sign Out</button>
        <button
          className="action__bar__button--signout"
          onClick={() => {console.log('profile button clicked')}}
        >Profile</button>
      </div>
    )
  }
}

const mapStateToProps = () => {
  return {}
}

export default withRouter(connect(mapStateToProps)(ActionBar))