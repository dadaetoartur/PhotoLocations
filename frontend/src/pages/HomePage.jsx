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
  moscow: 'Сердце России',
  'saint-petersburg': 'Северная Венеция',
  kazan: 'Там, где Восток встречает Запад',
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
          <p className="home__hero-eyebrow">Откройте Россию</p>
          <h1 className="home__hero-title">
            Легендарные места,<br />
            <em>запечатлённые</em>
          </h1>
          <p className="home__hero-sub">
            Исследуйте достопримечательности трёх великих городов России — каждая фотография открывает окно в историю, культуру и вечную красоту страны.
          </p>
          <div className="home__hero-cta">
            <a href="#cities" className="btn-primary">Исследовать города</a>
          </div>
        </div>
        <div className="home__hero-scroll">
          <span>листать</span>
          <div className="home__hero-scroll-line" />
        </div>
      </section>

      {/* Cities */}
      <section id="cities" className="home__cities container">
        <div className="section-header">
          <p className="section-label">Направления</p>
          <h2 className="section-title">Три города — одно путешествие</h2>
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
                    <span className="city-card__count">{city.landmark_count} достопримечательностей</span>
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
            { icon: '◎', label: 'Избранные места', desc: '30 фотографий достопримечательностей трёх великих городов' },
            { icon: '◷', label: 'Богатая история', desc: 'Подробные описания, хранящие память о столетиях культурного наследия' },
            { icon: '◈', label: 'Сообщество', desc: 'Делитесь впечатлениями и читайте отзывы других путешественников' },
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
          <span>Photo<em>Locations</em> · Россия</span>
        </div>
      </footer>
    </div>
  )
}
