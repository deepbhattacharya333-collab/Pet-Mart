// Register.jsx — Registration page for new users
// Saves user details (name, email, password) to localStorage under 'users'
// After successful registration, sends user to the Login page

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register() {

  // State for each form field
  const [name,      setName]      = useState('')
  const [email,     setEmail]     = useState('')
  const [password,  setPassword]  = useState('')
  const [confirm,   setConfirm]   = useState('')

  // States for messages
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg,   setErrorMsg]   = useState('')

  const navigate = useNavigate()

  // handleRegister — called when user clicks Register button
  function handleRegister() {

    // Clear old messages
    setSuccessMsg('')
    setErrorMsg('')

    // Check all fields are filled
    if (!name || !email || !password || !confirm) {
      setErrorMsg('⚠️ Please fill in all fields!')
      return
    }

    // Check password length (at least 6 characters)
    if (password.length < 6) {
      setErrorMsg('⚠️ Password must be at least 6 characters long!')
      return
    }

    // Check if passwords match
    if (password !== confirm) {
      setErrorMsg('⚠️ Passwords do not match! Please try again.')
      return
    }

    // Get existing users from localStorage
    const savedUsers = localStorage.getItem('users')
    let usersArray = []
    if (savedUsers) {
      usersArray = JSON.parse(savedUsers)
    }

    // Check if email is already registered
    const alreadyExists = usersArray.find(function(user) {
      return user.email === email
    })

    if (alreadyExists) {
      setErrorMsg('❌ This email is already registered. Please login instead.')
      return
    }

    // Create new user object
    const newUser = {
      id:       Date.now(),  // unique ID
      name:     name,
      email:    email,
      password: password     // Note: In real projects, passwords should be encrypted!
    }

    // Add new user to the array
    usersArray.push(newUser)

    // Save updated users array to localStorage
    localStorage.setItem('users', JSON.stringify(usersArray))

    // Show success message
    setSuccessMsg('🎉 Account created successfully! Taking you to login...')

    // Go to login page after 2 seconds
    setTimeout(function() {
      navigate('/login')
    }, 2000)
  }

  return (
    <div className="form-page-wrapper">
      <div className="form-card">

        {/* Form header */}
        <div className="form-card-header">
          <span className="form-icon">✨</span>
          <h2>Create an Account</h2>
          <p>Join Pet Mart and find your perfect pet companion</p>
        </div>

        {/* Success message */}
        {successMsg && (
          <div className="alert alert-success">{successMsg}</div>
        )}

        {/* Error message */}
        {errorMsg && (
          <div className="alert alert-error">{errorMsg}</div>
        )}

        {/* Full Name */}
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={function(e) { setName(e.target.value) }}
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={function(e) { setEmail(e.target.value) }}
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Minimum 6 characters"
            value={password}
            onChange={function(e) { setPassword(e.target.value) }}
          />
        </div>

        {/* Confirm Password */}
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Re-enter your password"
            value={confirm}
            onChange={function(e) { setConfirm(e.target.value) }}
          />
        </div>

        {/* Register button */}
        <button className="submit-btn" onClick={handleRegister}>
          Create Account →
        </button>

        {/* Link to Login page */}
        <p className="form-footer-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>

      </div>
    </div>
  )
}

export default Register
