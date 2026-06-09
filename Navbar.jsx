// Navbar.jsx — The top navigation bar shown on every page
// It checks localStorage to see if a user is logged in
// If logged in: shows the user's name and a Logout button
// If not logged in: shows Login and Register links

import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

function Navbar({ currentUser, setCurrentUser }) {
  const navigate = useNavigate()

  // handleLogout — called when user clicks Logout button
  function handleLogout() {
    // Remove the logged-in user from localStorage
    localStorage.removeItem('currentUser')

    // Update state so Navbar re-renders immediately
    setCurrentUser(null)

    // Go back to home page
    navigate('/')
  }

  return (
    <nav className="navbar">

      {/* Logo — clicking it goes to home page */}
      <Link to="/" className="navbar-logo">
        🐾 Pet<span>Mart</span>
      </Link>

      {/* Navigation links */}
      <ul className="navbar-links">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/pets">Browse Pets</NavLink></li>

        {/* Sell Pet link — highlighted as a button */}
        <li><Link to="/sell" className="nav-sell-btn">+ Sell Pet</Link></li>

        {/* Show Login/Register if NOT logged in */}
        {!currentUser && (
          <>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/register">Register</NavLink></li>
          </>
        )}

        {/* Show username and Logout if user IS logged in */}
        {currentUser && (
          <>
            {/* Show the logged-in user's name */}
            <li>
              <span className="navbar-user">
                👤 {currentUser.name}
              </span>
            </li>

            {/* Logout button */}
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>

    </nav>
  )
}

export default Navbar
