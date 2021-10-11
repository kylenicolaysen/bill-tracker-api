import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
  <header>
    <Link to="/">
      <h1 className="header__title">Bill Tracker - </h1> 
      <h3 className="header__title header__title--subtitle">has everyone paid their share?</h3>
    </Link>
  </header>
)

export default Header