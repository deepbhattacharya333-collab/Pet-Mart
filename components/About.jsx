// About.jsx — Fully redesigned modern About Us page
// Sections: Dark Hero → Stats → Our Story → Mission → Timeline → Team → CTA

import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// Custom hook: animates a number from 0 to target when element enters viewport
function useCountUp(target, duration = 1600) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const steps = 60
          const interval = duration / steps
          let step = 0
          const timer = setInterval(() => {
            step++
            const eased = 1 - Math.pow(1 - step / steps, 3)
            setCount(Math.round(eased * target))
            if (step >= steps) clearInterval(timer)
          }, interval)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return [count, ref]
}

function StatPill({ value, suffix, label }) {
  const [count, ref] = useCountUp(value)
  return (
    <div className="about-stat-pill" ref={ref}>
      <span className="about-stat-value">{count}{suffix}</span>
      <span className="about-stat-label">{label}</span>
    </div>
  )
}

function About() {
  return (
    <div className="about-page-v2">

      {/* ===== DARK CINEMATIC HERO ===== */}
      <section className="about-hero-v2">
        {/* Ambient glow orbs */}
        <div className="about-orb about-orb-1" />
        <div className="about-orb about-orb-2" />

        <div className="about-hero-inner">
          <span className="about-hero-eyebrow">🐾 About Pet Mart</span>
          <h1 className="about-hero-title">
            Built with Love,<br />
            <span className="about-hero-gradient">For Every Pet & Owner</span>
          </h1>
          <p className="about-hero-desc">
            A student-built platform connecting India's pet lovers with
            responsible sellers — because every animal deserves a caring home.
          </p>

          <div className="about-hero-actions">
            <Link to="/pets" className="btn-primary">Browse Pets 🐶</Link>
            <Link to="/sell" className="btn-outline-white">List Your Pet →</Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="about-scroll-hint">
          <span>Scroll to explore</span>
          <div className="about-scroll-dot" />
        </div>
      </section>

      {/* ===== ANIMATED STATS STRIP ===== */}
      <section className="about-stats-strip">
        <StatPill value={500}  suffix="+" label="Happy Buyers" />
        <div className="stats-divider" />
        <StatPill value={200}  suffix="+" label="Pet Listings" />
        <div className="stats-divider" />
        <StatPill value={50}   suffix="+"  label="Cities Covered" />
        <div className="stats-divider" />
        <StatPill value={2026} suffix=""   label="Founded In" />
      </section>

      {/* ===== OUR STORY ===== */}
      <section className="about-section">
        <div className="about-story-grid">

          {/* Left: image with floating badge */}
          <div className="about-story-img-wrap">
            <img
              src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&auto=format&fit=crop"
              alt="Pets together"
              className="about-story-img"
            />
            {/* Floating card on top of image */}
            <div className="about-story-float-card">
              <span className="float-card-emoji">🏆</span>
              <div>
                <span className="float-card-title">OJT Project</span>
                <span className="float-card-sub">B-Tech · 2nd Semester</span>
              </div>
            </div>
          </div>

          {/* Right: text */}
          <div className="about-story-text">
            <span className="about-eyebrow-tag">OUR STORY</span>
            <h2 className="about-section-title">Why We Built Pet Mart</h2>

            <p>
              Pet Mart was created as a college OJT project with a real-world purpose.
              We noticed that many people who want to buy or sell pets had no easy,
              trustworthy platform to do so. That problem sparked this idea.
            </p>
            <p>
              Our platform lets anyone browse pet listings from across India, read full
              pet details, and contact the seller directly — all for free. If you have
              a pet to sell, listing takes just a few minutes.
            </p>
            <p>
              We believe the bond between humans and animals is special, and we want
              to make it as easy as possible to find your perfect companion.
            </p>

            {/* Skill tags */}
            <div className="about-tech-tags">
              {['React JS', 'React Router', 'Plain CSS', 'LocalStorage', 'Vite'].map(tag => (
                <span className="tech-tag" key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== MISSION — GLASSMORPHIC CARDS ===== */}
      <section className="about-mission-section">
        <div className="about-section-header">
          <span className="about-eyebrow-tag about-eyebrow-light">OUR MISSION</span>
          <h2 className="about-section-title light">What We Stand For</h2>
          <p className="about-section-sub light">Three principles that guide everything we do</p>
        </div>

        <div className="mission-cards-grid">
          <div className="mission-card">
            <div className="mission-card-icon-wrap mission-icon-red">
              <span className="mission-card-icon">❤️</span>
            </div>
            <h3>Pet Welfare First</h3>
            <p>
              Every pet listed on our platform deserves love and care.
              We encourage responsible ownership and healthy environments for all animals.
            </p>
            <div className="mission-card-footer">
              <span>Learn More →</span>
            </div>
          </div>

          <div className="mission-card mission-card-center">
            <div className="mission-card-icon-wrap mission-icon-blue">
              <span className="mission-card-icon">🤝</span>
            </div>
            <h3>Building Community</h3>
            <p>
              Pet Mart is more than a marketplace — it's a community of pet lovers
              who share a passion for animals and help each other find the best companions.
            </p>
            <div className="mission-card-footer">
              <span>Learn More →</span>
            </div>
          </div>

          <div className="mission-card">
            <div className="mission-card-icon-wrap mission-icon-green">
              <span className="mission-card-icon">🌍</span>
            </div>
            <h3>Accessible to All</h3>
            <p>
              From big metros to small towns, finding a pet should be easy
              and affordable for everyone across India.
            </p>
            <div className="mission-card-footer">
              <span>Learn More →</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== JOURNEY TIMELINE ===== */}
      <section className="about-section about-timeline-section">
        <div className="about-section-header">
          <span className="about-eyebrow-tag">OUR JOURNEY</span>
          <h2 className="about-section-title">How Pet Mart Came to Life</h2>
        </div>

        <div className="timeline">
          <div className="timeline-line" />

          <div className="timeline-item timeline-item-left">
            <div className="timeline-dot" />
            <div className="timeline-card">
              <span className="timeline-step">Step 01</span>
              <h4>The Idea 💡</h4>
              <p>Noticed the gap in the market — no easy, safe pet marketplace in India for students and families.</p>
            </div>
          </div>

          <div className="timeline-item timeline-item-right">
            <div className="timeline-dot" />
            <div className="timeline-card">
              <span className="timeline-step">Step 02</span>
              <h4>Planning & Design 🎨</h4>
              <p>Designed the UI, mapped out features like Browse, Sell, Login, and Register pages.</p>
            </div>
          </div>

          <div className="timeline-item timeline-item-left">
            <div className="timeline-dot" />
            <div className="timeline-card">
              <span className="timeline-step">Step 03</span>
              <h4>Development 💻</h4>
              <p>Built with React JS, React Router, and plain CSS. Data stored securely in LocalStorage.</p>
            </div>
          </div>

          <div className="timeline-item timeline-item-right">
            <div className="timeline-dot timeline-dot-active" />
            <div className="timeline-card timeline-card-active">
              <span className="timeline-step">Step 04</span>
              <h4>Launch 🚀</h4>
              <p>Pet Mart is now live! Helping connect pet lovers and sellers across India in 2026.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MEET THE TEAM ===== */}
      <section className="about-team-section">
        <div className="about-section-header">
          <span className="about-eyebrow-tag about-eyebrow-light">OUR TEAM</span>
          <h2 className="about-section-title light">The People Behind Pet Mart</h2>
          <p className="about-section-sub light">A passionate group of B-Tech students who love coding and pets</p>
        </div>

        <div className="team-cards-v2">

          <div className="team-card-v2 team-card-featured">
            <div className="team-avatar-ring">
              <span className="team-avatar-emoji">👨‍💻</span>
            </div>
            <div className="team-card-badge">Project Lead</div>
            <h4>Deep Bhattacharya</h4>
            <p>Frontend Developer</p>
            <div className="team-skills">
              <span>React</span><span>CSS</span><span>UI Design</span>
            </div>
          </div>

          <div className="team-card-v2">
            <div className="team-avatar-ring">
              <span className="team-avatar-emoji">👩‍🎨</span>
            </div>
            <h4>UI Designer</h4>
            <p>Design & User Experience</p>
            <div className="team-skills">
              <span>Figma</span><span>Prototyping</span>
            </div>
          </div>

          <div className="team-card-v2">
            <div className="team-avatar-ring">
              <span className="team-avatar-emoji">👨‍🏫</span>
            </div>
            <h4>Project Mentor</h4>
            <p>Guide & Advisor</p>
            <div className="team-skills">
              <span>Mentoring</span><span>Review</span>
            </div>
          </div>

          <div className="team-card-v2 team-card-fun">
            <div className="team-avatar-ring team-avatar-ring-fun">
              <span className="team-avatar-emoji">🐶</span>
            </div>
            <h4>Bruno</h4>
            <p>Chief Happiness Officer</p>
            <div className="team-skills">
              <span>Cuddles</span><span>Good Boy</span>
            </div>
          </div>

        </div>
      </section>

      {/* ===== GLOWING CTA ===== */}
      <section className="about-cta-section">
        <div className="about-cta-glow" />
        <div className="about-cta-inner">
          <span className="about-cta-emoji">🐾</span>
          <h2>Ready to Find Your Perfect Pet?</h2>
          <p>Browse hundreds of verified listings from trusted sellers across India.</p>
          <div className="about-cta-btns">
            <Link to="/pets" className="btn-primary">Browse All Pets →</Link>
            <Link to="/sell" className="btn-outline-white">List a Pet</Link>
          </div>
        </div>
      </section>

    </div>
  )
}

export default About
