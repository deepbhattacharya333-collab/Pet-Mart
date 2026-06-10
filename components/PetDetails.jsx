// PetDetails.jsx — Shows full information about ONE specific pet
// useParams() reads the :id from the URL (e.g., /pets/3 → id = "3")
// It searches both pets.json AND localStorage to find the pet

import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import petsData from '../pets.json'

function PetDetails() {

  // useParams gives us the id from the URL
  const { id } = useParams()

  const navigate = useNavigate()

  // Step 1: Get user-added pets from localStorage
  const savedPets = localStorage.getItem('userPets')
  let localPets = []
  if (savedPets) {
    localPets = JSON.parse(savedPets)
  }

  // Step 2: Combine both sources into one array
  const allPets = [...petsData, ...localPets]

  // Step 3: Find the pet whose id matches the URL id
  // Note: pet.id is a number, but URL id is a string, so we convert with Number()
  const pet = allPets.find(function(p) {
    return p.id === Number(id) || p.id === id
  })

  // If pet not found (wrong URL), show a message
  if (!pet) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <p style={{ fontSize: '60px', marginBottom: '16px' }}>🔍</p>
        <h2 style={{ color: '#1e3a8a', marginBottom: '12px' }}>Pet Not Found</h2>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>
          The pet you are looking for does not exist or may have been removed.
        </p>
        <button className="btn-primary" onClick={function() { navigate('/pets') }}>
          ← Back to Pets
        </button>
      </div>
    )
  }

  // Handle "Contact Seller" button click
  function handleContact() {
    alert('📞 Contact ' + pet.seller + ' at +91 98765 43210 to enquire about ' + pet.name + '!')
  }

  return (
    <div className="pet-details-page">

      {/* Back navigation link */}
      <span className="back-link" onClick={function() { navigate(-1) }}>
        ← Go Back
      </span>

      {/* Main details card — two columns: image left, info right */}
      <div className="pet-details-card">

        {/* LEFT: Pet image */}
        <div className="pet-details-image">
          <img src={pet.image} alt={pet.name} />
          <span className="type-badge">{pet.type}</span>
        </div>

        {/* RIGHT: Pet information */}
        <div className="pet-details-info">

          <h1>{pet.name}</h1>

          {/* Price */}
          <div className="pet-details-price">
            ₹{pet.price.toLocaleString('en-IN')}
          </div>

          {/* Details rows */}
          <div className="detail-row">
            <strong>Breed:</strong> {pet.breed}
          </div>

          <div className="detail-row">
            <strong>Age:</strong> {pet.age} {pet.age === 1 ? 'year' : 'years'} old
          </div>

          {pet.location && (
            <div className="detail-row">
              <strong>Location:</strong> 📍 {pet.location}
            </div>
          )}

          {pet.seller && (
            <div className="detail-row">
              <strong>Seller:</strong> 👤 {pet.seller}
            </div>
          )}

          {/* Description box */}
          <div className="pet-description">
            <p style={{ fontWeight: '600', color: '#1e3a8a', marginBottom: '8px' }}>
              About {pet.name}
            </p>
            <p>{pet.description}</p>
          </div>

          {/* Contact seller button */}
          <button className="contact-btn" onClick={handleContact}>
            📞 Contact Seller
          </button>

        </div>
      </div>

    </div>
  )
}

export default PetDetails
