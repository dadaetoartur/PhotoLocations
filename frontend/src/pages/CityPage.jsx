import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { API } from '../context/AuthContext'
import LandmarkCard from '../components/LandmarkCard'
import './CityPage.css'

const HERO_IMAGES = {
  moscow: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=1800',
  'saint-petersburg': 'https://images.unsplash.com/photo-1548834925-e48f8a37e2e0?w=1800',
  kazan: 'https://images.unsplash.com/photo-1614436163996-25cee5f54290?w=1800',
}

export default function CityPage() {
  const { slug } = useParams()
  const [city, setCity] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    API.get(`/cities/${slug}/`)
      .then(({ data }) => setCity(data))
      .catch(() => setError('Город не найден.'))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return (
    <div className="city-page">
      <div className="city-page__hero city-page__hero--loading">
        <div className="skeleton" style={{position:'absolute',inset:0}} />
      </div>
      <div className="city-page__grid container">
        {Array.from({length: 6}, (_,i) => (
          <div key={i} className="skeleton" style={{height: 400, borderRadius: 2}} />
        ))}
      </div>
    </div>
  )

  if (error) return (
    <div className="city-page city-page--error container">
      <h2>{error}</h2>
      <Link to="/" className="btn-back">← На главную</Link>
    </div>
  )

  const heroImg = HERO_IMAGES[slug] || city.hero_image_url

  return (
    <div className="city-page">
      {/* Hero */}
      <section className="city-page__hero" style={{backgroundImage: `url(${heroImg})`}}>
        <div className="city-page__hero-overlay" />
        <div className="city-page__hero-content container">
          <Link to="/" className="city-page__breadcrumb">← Все города</Link>
          <h1 className="city-page__title">{city.name}</h1>
          <p className="city-page__subtitle">{city.description}</p>
          <div className="city-page__stats">
            <span>{city.landmarks?.length || 0} достопримечательностей</span>
            <span className="city-page__stats-dot">·</span>
            <span>{city.landmarks?.reduce((a, l) => a + (l.comment_count || 0), 0)} комментариев</span>
          </div>
        </div>
      </section>

      {/* Landmarks grid */}
      <section className="city-page__content container">
        <div className="section-header">
          <p className="section-label">Исследовать</p>
          <h2 className="section-title">Достопримечательности</h2>
        </div>

        <div className="city-page__grid">
          {city.landmarks?.map((landmark, i) => (
            <div key={landmark.id} style={{ animationDelay: `${i * 0.07}s` }}>
              <LandmarkCard landmark={landmark} />
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="city-footer">
        <div className="container city-footer__inner">
          <Link to="/" className="city-footer__back">← Ко всем городам</Link>
          <span className="city-footer__name">{city.name}</span>
        </div>
      </footer>
    </div>
  )
}
