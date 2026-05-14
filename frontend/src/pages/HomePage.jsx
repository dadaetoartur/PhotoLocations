import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { API } from '../context/AuthContext'
import './HomePage.css'

const CITY_HERO = {
  moscow: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=1200',
  'saint-petersburg': 'https://images.unsplash.com/photo-1548834925-e48f8a37e2e0?w=1200',
  kazan: 'https://images.unsplash.com/photo-1614436163996-25cee5f54290?w=1200',
}

const CITY_TAGLINES = {
  moscow: 'The Heart of Russia',
  'saint-petersburg': 'The Venice of the North',
  kazan: 'Where East Meets West',
}

export default function HomePage() {
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    API.get('/cities/')
      .then(({ data }) => setCities(data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="home">
      {/* Hero */}
      <section className="home__hero">
        <div className="home__hero-bg" />
        <div className="home__hero-content container">
          <p className="home__hero-eyebrow">Discover Russia</p>
          <h1 className="home__hero-title">
            Iconic Places,<br />
            <em>Captured</em>
          </h1>
          <p className="home__hero-sub">
            Explore landmarks across three of Russia's greatest cities — each photograph a window into history, culture, and enduring beauty.
          </p>
          <div className="home__hero-cta">
            <a href="#cities" className="btn-primary">Explore Cities</a>
          </div>
        </div>
        <div className="home__hero-scroll">
          <span>scroll</span>
          <div className="home__hero-scroll-line" />
        </div>
      </section>

      {/* Cities */}
      <section id="cities" className="home__cities container">
        <div className="section-header">
          <p className="section-label">Destinations</p>
          <h2 className="section-title">Three Cities, One Journey</h2>
        </div>

        {loading ? (
          <div className="home__cities-grid">
            {[1,2,3].map(i => (
              <div key={i} className="city-card city-card--skeleton">
                <div className="skeleton" style={{height: '100%'}} />
              </div>
            ))}
          </div>
        ) : (
          <div className="home__cities-grid">
            {cities.map((city, i) => (
              <Link
                to={`/city/${city.slug}`}
                key={city.id}
                className="city-card"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="city-card__image-wrap">
                  <img
                    src={CITY_HERO[city.slug] || city.hero_image_url}
                    alt={city.name}
                    className="city-card__image"
                  />
                  <div className="city-card__overlay" />
                </div>
                <div className="city-card__content">
                  <p className="city-card__tagline">{CITY_TAGLINES[city.slug]}</p>
                  <h3 className="city-card__name">{city.name}</h3>
                  <p className="city-card__desc">{city.description}</p>
                  <div className="city-card__footer">
                    <span className="city-card__count">{city.landmark_count} landmarks</span>
                    <span className="city-card__arrow">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Feature strip */}
      <section className="home__features">
        <div className="container home__features-inner">
          {[
            { icon: '◎', label: 'Curated Locations', desc: '30 landmark photographs across 3 great cities' },
            { icon: '◷', label: 'Rich History', desc: 'Expert descriptions from centuries of cultural legacy' },
            { icon: '◈', label: 'Community', desc: 'Share your thoughts and read others\' impressions' },
          ].map(f => (
            <div key={f.label} className="home__feature">
              <span className="home__feature-icon">{f.icon}</span>
              <strong className="home__feature-label">{f.label}</strong>
              <p className="home__feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="home__footer">
        <div className="container home__footer-inner">
          <span className="navbar__brand-icon">◈</span>
          <span>Photo<em>Locations</em> · Russia</span>
        </div>
      </footer>
    </div>
  )
}
