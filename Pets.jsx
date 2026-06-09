// Pets.jsx — Shows ALL pets in a grid
// Combines pets from pets.json (seed data) + pets saved in localStorage by users
// Also has filter buttons: All / Dog / Cat / Bird

import React, { useState, useEffect } from 'react'
import PetCard from './PetCard.jsx'
import petsData from './pets.json'   // seed pets from JSON file

function Pets() {

  // allPets stores combined list from JSON + localStorage
  const [allPets, setAllPets] = useState([])

  // activeFilter stores which type is selected (All / Dog / Cat / Bird)
  const [activeFilter, setActiveFilter] = useState('All')

  // useEffect runs once when the page loads
  useEffect(function() {

    // Step 1: Get user-added pets from localStorage
    const savedPets = localStorage.getItem('userPets')

    // Step 2: Convert from string back to array (if exists)
    let localPets = []
    if (savedPets) {
      localPets = JSON.parse(savedPets)
    }

    // Step 3: Merge JSON pets + localStorage pets into one array
    const combined = [...petsData, ...localPets]

    // Step 4: Save merged list in state
    setAllPets(combined)

  }, [])  // empty [] means: run only once on page load

  // Filter pets based on selected type
  // If 'All' is selected, show all pets. Otherwise, show only matching type.
  const petsToShow = activeFilter === 'All'
    ? allPets
    : allPets.filter(function(pet) { return pet.type === activeFilter })

  return (
    <div className="pets-page">

      {/* Page header */}
      <div className="pets-page-header">
        <h1>Browse All Pets</h1>
        <p>Showing {petsToShow.length} pets available for adoption</p>
      </div>

      {/* Filter buttons */}
      <div className="filter-bar">
        {/* Loop through filter options and create a button for each */}
        {['All', 'Dog', 'Cat', 'Bird', 'Rabbit', 'Fish', 'Other'].map(function(type) {
          return (
            <button
              key={type}
              className={'filter-btn' + (activeFilter === type ? ' active' : '')}
              onClick={function() { setActiveFilter(type) }}
            >
              {type === 'All'    ? '🐾 All'     : ''}
              {type === 'Dog'    ? '🐶 Dogs'    : ''}
              {type === 'Cat'    ? '🐱 Cats'    : ''}
              {type === 'Bird'   ? '🦜 Birds'   : ''}
              {type === 'Rabbit' ? '🐰 Rabbits' : ''}
              {type === 'Fish'   ? '🐟 Fish'    : ''}
              {type === 'Other'  ? '🐾 Other'   : ''}
            </button>
          )
        })}
      </div>

      {/* If no pets found for the selected filter */}
      {petsToShow.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
          <p style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</p>
          <p style={{ fontSize: '18px', fontWeight: '600', color: '#64748b' }}>
            No pets found in this category
          </p>
          <p style={{ fontSize: '14px', marginTop: '8px' }}>
            Try selecting a different filter or check back later
          </p>
        </div>
      )}

      {/* Grid of pet cards */}
      <div className="pets-grid">
        {petsToShow.map(function(pet) {
          return <PetCard key={pet.id} pet={pet} />
        })}
      </div>

    </div>
  )
}

export default Pets
