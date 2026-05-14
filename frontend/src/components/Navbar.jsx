import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__brand">
          <span className="navbar__brand-icon">◈</span>
          <span className="navbar__brand-text">Photo<em>Locations</em></span>
        </Link>

        <button
          className={`navbar__burger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>

        <div className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          <NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''} onClick={() => setMenuOpen(false)}>Главная</NavLink>
          <NavLink to="/city/moscow" className={({isActive}) => isActive ? 'active' : ''} onClick={() => setMenuOpen(false)}>Москва</NavLink>
          <NavLink to="/city/saint-petersburg" className={({isActive}) => isActive ? 'active' : ''} onClick={() => setMenuOpen(false)}>Санкт-Петербург</NavLink>
          <NavLink to="/city/kazan" className={({isActive}) => isActive ? 'active' : ''} onClick={() => setMenuOpen(false)}>Казань</NavLink>

          <div className="navbar__divider" />

          {user ? (
            <>
              <NavLink to="/profile" className={({isActive}) => `navbar__user ${isActive ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
                <span className="navbar__avatar">{(user.username || user.user?.username || '?')[0].toUpperCase()}</span>
                <span>{user.username || user.user?.username}</span>
              </NavLink>
              <button className="navbar__logout" onClick={handleLogout}>Выйти</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="navbar__auth-link" onClick={() => setMenuOpen(false)}>Войти</NavLink>
              <NavLink to="/register" className="navbar__auth-btn" onClick={() => setMenuOpen(false)}>Регистрация</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
