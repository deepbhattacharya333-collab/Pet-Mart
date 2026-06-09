// Home.jsx — The main landing page of Pet Mart
// Sections: Hero → About → Featured Pets (Bento Grid) → Why Choose Us → Footer

import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PetCard from './PetCard.jsx'
import petsData from './pets.json'

function Home() {
  const navigate = useNavigate()

  // Pick first 3 pets from pets.json to show as "Featured Pets"
  // One Dog, one Cat, one Bird — ids 1, 4, 7
  const featuredPets = [petsData[0], petsData[3], petsData[6]]

  // State for which card is "active" / hovered - for the bento grid
  const [activeCard, setActiveCard] = useState(null)

  // Floating animation counters for the hero stat badges
  const [count, setCount] = useState({ buyers: 0, listings: 0, cities: 0 })

  // Animate numbers counting up on mount
  useEffect(() => {
    const targets = { buyers: 500, listings: 200, cities: 50 }
    const duration = 1800
    const steps = 60
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount({
        buyers: Math.round(eased * targets.buyers),
        listings: Math.round(eased * targets.listings),
        cities: Math.round(eased * targets.cities),
      })
      if (step >= steps) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <div>

      {/* ===== HERO SECTION ===== */}
      <section className="hero-section">

        {/* Left side: heading + description + buttons */}
        <div className="hero-text">
          <span className="hero-badge">🐾 India's Trusted Pet Marketplace</span>

          <h1>
            Find Your <span>Perfect Pet</span> Companion
          </h1>

          <p>
            Discover thousands of loving pets waiting for a new home.
            Connect with trusted sellers across India and bring joy into your life.
          </p>

          {/* Two call-to-action buttons */}
          <div className="hero-buttons">
            <Link to="/pets" className="btn-primary">Browse Pets 🐶</Link>
            <Link to="/sell" className="btn-secondary">Sell a Pet 📋</Link>
          </div>

          {/* Floating stat pills below buttons */}
          <div className="hero-stat-pills">
            <div className="hero-stat-pill">
              <span className="hero-stat-num">{count.buyers}+</span>
              <span className="hero-stat-lbl">Happy Buyers</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat-pill">
              <span className="hero-stat-num">{count.listings}+</span>
              <span className="hero-stat-lbl">Pet Listings</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat-pill">
              <span className="hero-stat-num">{count.cities}+</span>
              <span className="hero-stat-lbl">Cities Covered</span>
            </div>
          </div>
        </div>

        {/* Right side: grid of 3 pet images */}
        <div className="hero-images">

          {/* Big image — Dog */}
          <div className="hero-img-box">
            <img
              src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&auto=format&fit=crop"
              alt="Happy dog"
            />
          </div>

          {/* Small image — Cat */}
          <div className="hero-img-box">
            <img
              src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&auto=format&fit=crop"
              alt="Cute cat"
            />
          </div>

          {/* Small image — Bird */}
          <div className="hero-img-box">
            <img
              src="https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&auto=format&fit=crop"
              alt="Colorful bird"
            />
          </div>

        </div>
      </section>

      {/* ===== FEATURED PETS SECTION — BENTO MOSAIC ===== */}
      <section className="section section-dark-featured">

        {/* Section Header */}
        <div className="section-heading featured-heading">
          <span className="tag tag-glow">✨ FEATURED PETS</span>
          <h2 className="featured-title">Meet Our Most Popular Pets</h2>
          <p className="featured-subtitle">
            Hand-picked companions from trusted sellers — hover to explore
          </p>
        </div>

        {/* Bento Mosaic Grid */}
        <div className="bento-grid">

          {/* === CARD 1 — Large Left Hero Card (Dog) === */}
          <div
            className={`bento-card bento-card-hero ${activeCard === 0 ? 'bento-active' : ''}`}
            onMouseEnter={() => setActiveCard(0)}
            onMouseLeave={() => setActiveCard(null)}
            onClick={() => navigate('/pets/' + featuredPets[0].id)}
            id="featured-pet-1"
          >
            {/* Background image */}
            <div className="bento-bg">
              <img src={featuredPets[0].image} alt={featuredPets[0].name} />
            </div>

            {/* Gradient overlay */}
            <div className="bento-overlay" />

            {/* Floating type badge */}
            <div className="bento-type-badge">
              <span className="bento-type-dot" />
              {featuredPets[0].type}
            </div>

            {/* Bottom content */}
            <div className="bento-content">
              <div className="bento-breed">{featuredPets[0].breed}</div>
              <h3 className="bento-name">{featuredPets[0].name}</h3>

              {/* Slide-up on hover: price + CTA */}
              <div className="bento-footer">
                <div className="bento-price">
                  ₹{featuredPets[0].price.toLocaleString('en-IN')}
                </div>
                <button className="bento-cta">
                  View Details
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Location tag */}
              <div className="bento-location">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                </svg>
                {featuredPets[0].location}
              </div>
            </div>
          </div>

          {/* === RIGHT COLUMN: 2 stacked cards === */}
          <div className="bento-right-col">

            {/* === CARD 2 — Cat === */}
            <div
              className={`bento-card bento-card-half ${activeCard === 1 ? 'bento-active' : ''}`}
              onMouseEnter={() => setActiveCard(1)}
              onMouseLeave={() => setActiveCard(null)}
              onClick={() => navigate('/pets/' + featuredPets[1].id)}
              id="featured-pet-2"
            >
              <div className="bento-bg">
                <img src={featuredPets[1].image} alt={featuredPets[1].name} />
              </div>
              <div className="bento-overlay" />
              <div className="bento-type-badge bento-type-badge-cat">
                <span className="bento-type-dot bento-dot-cat" />
                {featuredPets[1].type}
              </div>
              <div className="bento-content">
                <div className="bento-breed">{featuredPets[1].breed}</div>
                <h3 className="bento-name bento-name-sm">{featuredPets[1].name}</h3>
                <div className="bento-footer">
                  <div className="bento-price">
                    ₹{featuredPets[1].price.toLocaleString('en-IN')}
                  </div>
                  <button className="bento-cta bento-cta-sm">
                    View
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <div className="bento-location">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  </svg>
                  {featuredPets[1].location}
                </div>
              </div>
            </div>

            {/* === CARD 3 — Bird === */}
            <div
              className={`bento-card bento-card-half ${activeCard === 2 ? 'bento-active' : ''}`}
              onMouseEnter={() => setActiveCard(2)}
              onMouseLeave={() => setActiveCard(null)}
              onClick={() => navigate('/pets/' + featuredPets[2].id)}
              id="featured-pet-3"
            >
              <div className="bento-bg">
                <img src={featuredPets[2].image} alt={featuredPets[2].name} />
              </div>
              <div className="bento-overlay" />
              <div className="bento-type-badge bento-type-badge-bird">
                <span className="bento-type-dot bento-dot-bird" />
                {featuredPets[2].type}
              </div>
              <div className="bento-content">
                <div className="bento-breed">{featuredPets[2].breed}</div>
                <h3 className="bento-name bento-name-sm">{featuredPets[2].name}</h3>
                <div className="bento-footer">
                  <div className="bento-price">
                    ₹{featuredPets[2].price.toLocaleString('en-IN')}
                  </div>
                  <button className="bento-cta bento-cta-sm">
                    View
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <div className="bento-location">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  </svg>
                  {featuredPets[2].location}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Button to see all pets */}
        <div className="text-center" style={{ marginTop: '48px' }}>
          <Link to="/pets" className="btn-primary btn-primary-glow">
            Explore All Pets →
          </Link>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section className="section section-white">
        <div className="about-grid">

          {/* Left: image */}
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=700&auto=format&fit=crop"
              alt="Pets together"
            />
          </div>

          {/* Right: text content */}
          <div className="about-content">
            <span className="tag">ABOUT PET MART</span>
            <h2>India's Most Trusted Pet Buying &amp; Selling Platform</h2>
            <p>
              Pet Mart was created with one simple goal — to connect loving pet owners
              with people who are looking for a new furry, feathered, or scaly friend.
              We believe every pet deserves a caring home.
            </p>
            <p>
              Whether you want to adopt a playful puppy, a calm cat, or a cheerful bird,
              Pet Mart makes it easy to find the perfect companion. All our listings are
              from real verified sellers across India.
            </p>

            {/* Three quick stats */}
            <div className="about-stats">
              <div className="stat-box">
                <span className="stat-number">500+</span>
                <span className="stat-label">Happy Buyers</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">200+</span>
                <span className="stat-label">Pet Listings</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">50+</span>
                <span className="stat-label">Cities Covered</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===== WHY CHOOSE US SECTION ===== */}
      <section className="section section-light">
        <div className="section-heading">
          <span className="tag">WHY CHOOSE US</span>
          <h2>Why Thousands Trust Pet Mart</h2>
          <p>We make buying and selling pets simple, safe, and joyful</p>
        </div>

        {/* Three feature boxes */}
        <div className="features-grid">

          <div className="feature-card">
            <span className="feature-icon">🛒</span>
            <h3>Easy Buy &amp; Sell</h3>
            <p>
              Browse hundreds of pet listings or list your own pet for sale in just a few minutes.
              The process is simple and completely free.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">✅</span>
            <h3>Trusted Listings</h3>
            <p>
              All pets listed on Pet Mart are from real registered users.
              Each listing includes detailed information about the pet's health and breed.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">📱</span>
            <h3>User Friendly Interface</h3>
            <p>
              Our clean and modern design makes it super easy to find the pet you love.
              Works perfectly on mobile, tablet and desktop.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">🏠</span>
            <h3>Home Delivery Info</h3>
            <p>
              Sellers can coordinate safe delivery or pickup options directly with buyers
              through our platform messaging system.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">💰</span>
            <h3>Best Prices</h3>
            <p>
              Compare prices from multiple sellers across India and find the best deal
              for your favourite pet breed.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">🐾</span>
            <h3>All Pet Types</h3>
            <p>
              From dogs and cats to birds, rabbits and fish — we have listings for
              all kinds of pets to suit every lifestyle.
            </p>
          </div>

        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="footer-grid">

          {/* Brand column */}
          <div className="footer-brand">
            <div className="brand-name">🐾 Pet<span>Mart</span></div>
            <p>
              India's most trusted online platform for buying and selling pets.
              Connecting pet lovers across the country since 2026.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/pets">Browse Pets</Link></li>
              <li><Link to="/sell">Sell a Pet</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>

          {/* Pet Types */}
          <div className="footer-col">
            <h4>Pet Categories</h4>
            <ul>
              <li><Link to="/pets">Dogs</Link></li>
              <li><Link to="/pets">Cats</Link></li>
              <li><Link to="/pets">Birds</Link></li>
              <li><Link to="/pets">Rabbits</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Contact Us</h4>
            <ul>
              <li><a href="#">📧 hello@petmart.in</a></li>
              <li><a href="#">📞 +91 98765 43210</a></li>
              <li><a href="#">📍 New Delhi, India</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="footer-bottom">
          <p>© 2026 Pet Mart. Made with ❤️ for pet lovers across India.</p>
        </div>
      </footer>

    </div>
  )
}

export default Home
