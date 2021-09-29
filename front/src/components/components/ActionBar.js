import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { isNotAuthd } from '../../actions/authentication'

const ActionBar = (props) =>  (
  <div className="action__bar">
  <Link to="/bill"><button className="action__bar__button">Add Bill</button></Link>
  <button 
    className="action__bar__button--signout"
    onClick={() => {props.dispatch(isNotAuthd())}}
  >Sign Out</button>
  </div>
) 

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authentication.isAuthenticated
  }
}

export default connect(mapStateToProps)(ActionBar)