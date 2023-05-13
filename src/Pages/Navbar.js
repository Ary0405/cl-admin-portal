import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/Navbar.css'
function Navbar() {
  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand mx-3" to="/" id='home-link'>Home </Link>
            <Link className="navbar-brand disabled" to="/admin" id='admin-link' >Admin </Link>
            <Link className="navbar-brand disabled" to="/jury" id='jury-link'>Jury </Link>
        </nav>            
    </>
  )
}

export default Navbar