// Login.jsx — Login page for existing users
// Checks email and password against users stored in localStorage
// If match found: saves currentUser and goes to Home page

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login({ setCurrentUser }) {

  // State for form fields
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')

  // State for error message
  const [errorMsg, setErrorMsg] = useState('')

  const navigate = useNavigate()

  // handleLogin — called when user clicks the Login button
  function handleLogin() {

    // Clear previous error
    setErrorMsg('')

    // Check if both fields are filled
    if (!email || !password) {
      setErrorMsg('⚠️ Please enter your email and password!')
      return
    }

    // Get all registered users from localStorage
    const savedUsers = localStorage.getItem('users')

    // If no users have registered yet
    if (!savedUsers) {
      setErrorMsg('❌ No account found. Please register first!')
      return
    }

    // Convert stored string back to array of user objects
    const usersArray = JSON.parse(savedUsers)

    // Find a user that matches BOTH email AND password
    const matchedUser = usersArray.find(function(user) {
      return user.email === email && user.password === password
    })

    // If no matching user found
    if (!matchedUser) {
      setErrorMsg('❌ Wrong email or password. Please try again!')
      return
    }

    // Login successful! Save the logged-in user to localStorage
    localStorage.setItem('currentUser', JSON.stringify(matchedUser))

    // Update the lifted auth state so the app and Navbar update reactively
    setCurrentUser(matchedUser)

    // Go to home page
    navigate('/')
  }

  return (
    <div className="form-page-wrapper">
      <div className="form-card">

        {/* Form header */}
        <div className="form-card-header">
          <span className="form-icon" role="img" aria-label="lock">🔐</span>
          <h2>Welcome Back!</h2>
          <p>Login to your Pet Mart account</p>
        </div>

        {/* Error message (shown only if there is an error) */}
        {errorMsg && (
          <div className="alert alert-error" role="alert">{errorMsg}</div>
        )}

        {/* Email field */}
        <div className="form-group">
          <label htmlFor="login-email">Email Address</label>
          <input
            id="login-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={function(e) { setEmail(e.target.value) }}
          />
        </div>

        {/* Password field */}
        <div className="form-group">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={function(e) { setPassword(e.target.value) }}
          />
        </div>

        {/* Login button */}
        <button className="submit-btn" onClick={handleLogin}>
          Login →
        </button>

        {/* Link to Register page */}
        <p className="form-footer-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>

      </div>
    </div>
  )
}

export default Login
