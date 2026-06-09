// App.jsx — Main file that sets up all page routes
// React Router reads the URL and shows the correct page

import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Import all pages
import Home       from './Home.jsx'
import About      from './About.jsx'
import Pets       from './Pets.jsx'
import PetDetails from './PetDetails.jsx'
import SellPet    from './SellPet.jsx'
import Login      from './Login.jsx'
import Register   from './Register.jsx'

// Import the Navbar component (shown on every page)
import Navbar from './Navbar.jsx'

// Import global CSS styles
import './App.css'

function App() {
  // Lifted authentication state — shared dynamically between Navbar, Login and SellPet
  const savedUser = localStorage.getItem('currentUser')
  const [currentUser, setCurrentUser] = useState(
    savedUser ? JSON.parse(savedUser) : null
  )

  return (
    // BrowserRouter enables URL-based navigation
    <BrowserRouter>

      {/* Navbar receives the current auth state and setter to respond immediately */}
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

      {/* Routes decide which page to show based on the URL */}
      <Routes>
        <Route path="/"           element={<Home />}       />
        <Route path="/about"      element={<About />}      />
        <Route path="/pets"       element={<Pets />}       />
        <Route path="/pets/:id"   element={<PetDetails />} />
        <Route path="/sell"       element={<SellPet currentUser={currentUser} />}    />
        <Route path="/login"      element={<Login setCurrentUser={setCurrentUser} />}      />
        <Route path="/register"   element={<Register />}   />
      </Routes>

    </BrowserRouter>
  )
}

export default App
