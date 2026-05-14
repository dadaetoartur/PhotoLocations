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
        setErrors({ non_field_errors: ['Что-то пошло не так. Попробуйте ещё раз.'] })
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
          <h1 className="auth-card__title">Создать аккаунт</h1>
          <p className="auth-card__sub">Присоединяйтесь к сообществу любителей фотографии и путешествий.</p>
        </div>

        {errors.non_field_errors && (
          <div className="auth-card__error">{errors.non_field_errors[0]}</div>
        )}

        <form className="auth-form auth-form--grid" onSubmit={handleSubmit}>
          {field('first_name', 'Имя', 'text', 'Анна')}
          {field('last_name', 'Фамилия', 'text', 'Петрова')}
          {field('username', 'Имя пользователя *', 'text', 'anna_petrova')}
          {field('email', 'Email', 'email', 'anna@example.com')}
          {field('password', 'Пароль *', 'password', '••••••••')}
          {field('password2', 'Подтвердите пароль *', 'password', '••••••••')}

          <button className="auth-form__submit auth-form__submit--full" type="submit" disabled={loading}>
            {loading ? 'Создание аккаунта…' : 'Создать аккаунт'}
          </button>
        </form>

        <p className="auth-card__switch">
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  )
}
