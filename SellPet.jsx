// SellPet.jsx — A form page where users can list their pet for sale
// When submitted, the new pet is saved to localStorage under 'userPets'
// After saving, user is taken to the Pets page automatically

import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function SellPet({ currentUser }) {

  // One state variable for each form field
  const [petName,     setPetName]     = useState('')
  const [petType,     setPetType]     = useState('')
  const [breed,       setBreed]       = useState('')
  const [age,         setAge]         = useState('')
  const [price,       setPrice]       = useState('')
  const [location,    setLocation]    = useState('')
  const [image,       setImage]       = useState('')
  const [description, setDescription] = useState('')

  // States for showing success or error messages
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg,   setErrorMsg]   = useState('')

  const navigate = useNavigate()

  // Protect the route: if user is not logged in, prompt them to login first
  if (!currentUser) {
    return (
      <div className="form-page-wrapper">
        <div className="form-card text-center">
          <div className="form-card-header">
            <span className="form-icon" role="img" aria-label="warning">⚠️</span>
            <h2>Login Required</h2>
            <p>You must have a registered account to list a pet for sale on Pet Mart.</p>
          </div>
          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link to="/login" className="btn-primary w-full text-center">
              Login to My Account
            </Link>
            <Link to="/pets" className="btn-outline w-full text-center">
              Browse Available Pets
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // handleSubmit runs when user clicks "List My Pet" button
  function handleSubmit() {

    // Clear old messages
    setSuccessMsg('')
    setErrorMsg('')

    // Validate — check that required fields are not empty
    if (!petName || !petType || !breed || !age || !price || !description || !location) {
      setErrorMsg('⚠️ Please fill in all the required fields!')
      return   // stop here if validation fails
    }

    // Get seller name from the validated currentUser prop
    const sellerName = currentUser ? currentUser.name : 'Anonymous'

    // Build the new pet object
    const newPet = {
      id:          Date.now(),  // unique ID using current timestamp
      name:        petName,
      type:        petType,
      breed:       breed,
      age:         Number(age),    // convert string to number
      price:       Number(price),  // convert string to number
      location:    location,
      seller:      sellerName,
      // Use given image URL or fall back to a default pet image
      image:       image || 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&auto=format&fit=crop',
      description: description
    }

    // Get existing user pets from localStorage (or empty array)
    const savedPets = localStorage.getItem('userPets')
    let petsArray = []
    if (savedPets) {
      petsArray = JSON.parse(savedPets)
    }

    // Add the new pet to the array
    petsArray.push(newPet)

    // Save updated array back to localStorage as a string
    localStorage.setItem('userPets', JSON.stringify(petsArray))

    // Show success message
    setSuccessMsg('🎉 Your pet has been listed successfully!')

    // Wait 2 seconds then go to Pets page
    setTimeout(function() {
      navigate('/pets')
    }, 2000)
  }

  return (
    <div className="form-page-wrapper">
      <div className="form-card form-card-wide">

        {/* Form header */}
        <div className="form-card-header">
          <span className="form-icon" role="img" aria-label="paw">🐾</span>
          <h2>List Your Pet for Sale</h2>
          <p>Fill in the details below and your pet will appear in our listings</p>
        </div>

        {/* Success message */}
        {successMsg && (
          <div className="alert alert-success" role="alert">{successMsg}</div>
        )}

        {/* Error message */}
        {errorMsg && (
          <div className="alert alert-error" role="alert">{errorMsg}</div>
        )}

        {/* Pet Name */}
        <div className="form-group">
          <label htmlFor="pet-name">Pet Name *</label>
          <input
            id="pet-name"
            type="text"
            placeholder="e.g. Tommy"
            value={petName}
            onChange={function(e) { setPetName(e.target.value) }}
          />
        </div>

        {/* Pet Type and Breed — side by side */}
        <div className="form-row">

          <div className="form-group">
            <label htmlFor="pet-type">Pet Type *</label>
            <select
              id="pet-type"
              value={petType}
              onChange={function(e) { setPetType(e.target.value) }}
            >
              <option value="">-- Select Type --</option>
              <option value="Dog">🐶 Dog</option>
              <option value="Cat">🐱 Cat</option>
              <option value="Bird">🦜 Bird</option>
              <option value="Rabbit">🐰 Rabbit</option>
              <option value="Fish">🐟 Fish</option>
              <option value="Other">🐾 Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="pet-breed">Breed *</label>
            <input
              id="pet-breed"
              type="text"
              placeholder="e.g. Labrador"
              value={breed}
              onChange={function(e) { setBreed(e.target.value) }}
            />
          </div>

        </div>

        {/* Age and Price — side by side */}
        <div className="form-row">

          <div className="form-group">
            <label htmlFor="pet-age">Age (in years) *</label>
            <input
              id="pet-age"
              type="number"
              placeholder="e.g. 2"
              min="0"
              value={age}
              onChange={function(e) { setAge(e.target.value) }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="pet-price">Price (₹) *</label>
            <input
              id="pet-price"
              type="number"
              placeholder="e.g. 5000"
              min="0"
              value={price}
              onChange={function(e) { setPrice(e.target.value) }}
            />
          </div>

        </div>

        {/* Location */}
        <div className="form-group">
          <label htmlFor="pet-location">Location (City) *</label>
          <input
            id="pet-location"
            type="text"
            placeholder="e.g. Delhi"
            value={location}
            onChange={function(e) { setLocation(e.target.value) }}
          />
        </div>

        {/* Image URL — optional */}
        <div className="form-group">
          <label htmlFor="pet-image">Pet Image URL (optional)</label>
          <input
            id="pet-image"
            type="text"
            placeholder="Paste an image link here (leave blank for default)"
            value={image}
            onChange={function(e) { setImage(e.target.value) }}
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="pet-description">Description *</label>
          <textarea
            id="pet-description"
            placeholder="Describe your pet — health, temperament, vaccination status, etc."
            value={description}
            onChange={function(e) { setDescription(e.target.value) }}
          />
        </div>

        {/* Submit button */}
        <button className="submit-btn" onClick={handleSubmit}>
          🐾 List My Pet
        </button>

        {/* Link back to pets page */}
        <p className="form-footer-link">
          Changed your mind? <Link to="/pets">Browse Pets Instead</Link>
        </p>

      </div>
    </div>
  )
}

export default SellPet
