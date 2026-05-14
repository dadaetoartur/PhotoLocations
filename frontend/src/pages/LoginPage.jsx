import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './AuthPages.css'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'

  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.username, form.password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid username or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-page__bg" />
      <div className="auth-card">
        <div className="auth-card__header">
          <Link to="/" className="auth-card__logo">◈ Photo<em>Locations</em></Link>
          <h1 className="auth-card__title">Welcome back</h1>
          <p className="auth-card__sub">Sign in to leave comments and track your favourite landmarks.</p>
        </div>

        {error && <div className="auth-card__error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form__group">
            <label className="auth-form__label">Username</label>
            <input
              className="auth-form__input"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              autoFocus
              placeholder="your_username"
            />
          </div>
          <div className="auth-form__group">
            <label className="auth-form__label">Password</label>
            <input
              className="auth-form__input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
          </div>
          <button className="auth-form__submit" type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="auth-card__switch">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  )
}
