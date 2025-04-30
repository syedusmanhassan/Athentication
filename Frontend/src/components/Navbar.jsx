import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import "../css/Navbar.css"

const Navbar = () => {
   const navigate = useNavigate()

  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate("/login");
  }



  return (
    <nav className='navbar'>
        <div className='navbar-brand'>
            <Link to="/"> Movie App </Link>
        </div>
        <div className='navbar-links' >
            <Link to="/profile" className='nav-link'>Home</Link>
            <Link to="/favorites" className='nav-links'>Favorites</Link>
            <button className='nav-link logout-button' onClick={handleLogout}>Logout</button>
        </div>


    </nav>
  )
}

export default Navbar