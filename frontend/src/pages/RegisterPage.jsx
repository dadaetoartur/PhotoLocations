import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './AuthPages.css'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: '', email: '', first_name: '', last_name: '',
    password: '', password2: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setErrors({})
    setLoading(true)
    try {
      await register(form)
      navigate('/profile')
    } catch (err) {
      if (err.response?.data) {
        setErrors(err.response.data)
      } else {
        setErrors({ non_field_errors: ['Something went wrong. Please try again.'] })
      }
    } finally {
      setLoading(false)
    }
  }

  const field = (name, label, type = 'text', placeholder = '') => (
    <div className="auth-form__group">
      <label className="auth-form__label">{label}</label>
      <input
        className={`auth-form__input ${errors[name] ? 'auth-form__input--error' : ''}`}
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {errors[name] && <p className="auth-form__field-error">{errors[name][0]}</p>}
    </div>
  )

  return (
    <div className="auth-page">
      <div className="auth-page__bg" />
      <div className="auth-card auth-card--wide">
        <div className="auth-card__header">
          <Link to="/" className="auth-card__logo">◈ Photo<em>Locations</em></Link>
          <h1 className="auth-card__title">Create an account</h1>
          <p className="auth-card__sub">Join our community of photography enthusiasts and travellers.</p>
        </div>

        {errors.non_field_errors && (
          <div className="auth-card__error">{errors.non_field_errors[0]}</div>
        )}

        <form className="auth-form auth-form--grid" onSubmit={handleSubmit}>
          {field('first_name', 'First name', 'text', 'Anna')}
          {field('last_name', 'Last name', 'text', 'Petrova')}
          {field('username', 'Username *', 'text', 'anna_petrova')}
          {field('email', 'Email', 'email', 'anna@example.com')}
          {field('password', 'Password *', 'password', '••••••••')}
          {field('password2', 'Confirm password *', 'password', '••••••••')}

          <button className="auth-form__submit auth-form__submit--full" type="submit" disabled={loading}>
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="auth-card__switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
