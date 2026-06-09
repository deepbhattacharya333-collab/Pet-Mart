// PetCard.jsx — A reusable card component that shows one pet's info
// It is used in both the Home page (Featured section) and the Pets page
// Clicking the card navigates to the PetDetails page for that pet

import React from 'react'
import { useNavigate } from 'react-router-dom'

// This component receives one pet object as a "prop"
function PetCard({ pet }) {

  const navigate = useNavigate()

  // When the card is clicked, go to /pets/id
  function goToDetails() {
    navigate('/pets/' + pet.id)
  }

  return (
    <div className="pet-card" onClick={goToDetails}>

      {/* Pet type badge shown on top of the image (e.g., "Dog") */}
      <span className="pet-card-badge">{pet.type}</span>

      {/* Pet image */}
      <img src={pet.image} alt={pet.name} />

      {/* Card body with name, breed, price */}
      <div className="pet-card-body">
        <h3>{pet.name}</h3>
        <p className="breed">{pet.breed}</p>

        {/* Location info */}
        {pet.location && (
          <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>
            📍 {pet.location}
          </p>
        )}

        {/* Bottom row: price and button */}
        <div className="pet-card-meta">
          <span className="price">₹{pet.price.toLocaleString('en-IN')}</span>
          <button className="view-btn">View Details →</button>
        </div>
      </div>

    </div>
  )
}

export default PetCard
