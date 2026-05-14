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
      setError(err.response?.data?.error || 'Неверное имя пользователя или пароль.')
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
          <h1 className="auth-card__title">С возвращением</h1>
          <p className="auth-card__sub">Войдите, чтобы оставлять комментарии и отмечать любимые достопримечательности.</p>
        </div>

        {error && <div className="auth-card__error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form__group">
            <label className="auth-form__label">Имя пользователя</label>
            <input
              className="auth-form__input"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              autoFocus
              placeholder="ваш_логин"
            />
          </div>
          <div className="auth-form__group">
            <label className="auth-form__label">Пароль</label>
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
            {loading ? 'Вход…' : 'Войти'}
          </button>
        </form>

        <p className="auth-card__switch">
          Нет аккаунта? <Link to="/register">Создать</Link>
        </p>
      </div>
    </div>
  )
}
