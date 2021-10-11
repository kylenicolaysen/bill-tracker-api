import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { isNotAuthd } from '../../actions/authentication'

const ActionBar = (props) => {
return (
  <div className="action__bar">
    <button
      className={props.activePage==='add-bill' ? 'action__bar__button--active' : 'action__bar__button'}
      onClick={() => {
        if (props.activePage==='add-bill') {
          return
        }
        props.history.push('/add-bill')
      }}
    >Add Bill</button>
    <button
      className={props.activePage==='bills-dashboard' ? 'action__bar__button--active' : 'action__bar__button'}
      onClick={() => props.history.push('/bills-dashboard')}
    >All Bills</button>
    <button
      className="action__bar__button--secondary"
      onClick={() => {props.dispatch(isNotAuthd())}}
    >Sign Out</button>
    <button
      className="action__bar__button--secondary"
      onClick={() => props.history.push('/profile')}
    >Profile</button>
  </div>
)}

const mapStateToProps = () => {
  return {}
}

export default withRouter(connect(mapStateToProps)(ActionBar))