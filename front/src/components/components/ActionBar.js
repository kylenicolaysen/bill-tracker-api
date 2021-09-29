import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const ActionBar = () => (
  <div className="action__bar">
    <Link to="/add-bill"><button className="action__bar__button">Add Bill</button></Link>
    <Link to="/login"><button className="action__bar__button--signout">Sign Out</button></Link>
  </div>
)

const mapStateToProps = () => {
  return {}
}

export default connect(mapStateToProps)(ActionBar)