import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, API } from '../context/AuthContext'
import './ProfilePage.css'

export default function ProfilePage() {
  const { user, logout, refreshProfile } = useAuth()
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [form, setForm] = useState({ bio: '', avatar_url: '' })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    API.get('/auth/me/').then(({ data }) => {
      setProfile(data)
      setForm({ bio: data.bio || '', avatar_url: data.avatar_url || '' })
    })
  }, [user])

  const handleSave = async e => {
    e.preventDefault()
    setSaving(true)
    try {
      const { data } = await API.patch('/auth/me/', form)
      setProfile(data)
      setEditMode(false)
      setSaved(true)
      await refreshProfile()
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (!profile) return (
    <div className="profile-page container">
      <div className="profile-page__loading">
        <div className="skeleton" style={{width: 80, height: 80, borderRadius: '50%'}} />
        <div className="skeleton" style={{width: 200, height: 28, marginTop: 16}} />
        <div className="skeleton" style={{width: 140, height: 16, marginTop: 8}} />
      </div>
    </div>
  )

  const username = profile.user?.username || profile.username || ''
  const initial = username[0]?.toUpperCase() || '?'
  const memberSince = new Date(profile.user?.date_joined).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long'
  })

  return (
    <div className="profile-page">
      <div className="profile-page__hero">
        <div className="profile-page__hero-bg" />
        <div className="container profile-page__hero-inner">
          <div className="profile-avatar">
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt={username} className="profile-avatar__img" />
            ) : (
              <div className="profile-avatar__initial">{initial}</div>
            )}
          </div>
          <div className="profile-info">
            <h1 className="profile-info__name">{profile.user?.first_name || username}</h1>
            <p className="profile-info__username">@{username}</p>
            {profile.bio && <p className="profile-info__bio">{profile.bio}</p>}
            <div className="profile-info__meta">
              <span>Member since {memberSince}</span>
              <span className="profile-info__dot">·</span>
              <span>{profile.comment_count} comment{profile.comment_count !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container profile-page__content">
        {saved && (
          <div className="profile-saved">✓ Profile updated successfully</div>
        )}

        <div className="profile-card">
          <div className="profile-card__header">
            <h2 className="profile-card__title">Profile Settings</h2>
            {!editMode && (
              <button className="profile-card__edit-btn" onClick={() => setEditMode(true)}>
                Edit Profile
              </button>
            )}
          </div>

          {editMode ? (
            <form className="profile-form" onSubmit={handleSave}>
              <div className="profile-form__group">
                <label className="profile-form__label">Avatar URL</label>
                <input
                  className="profile-form__input"
                  type="url"
                  value={form.avatar_url}
                  onChange={e => setForm(f => ({ ...f, avatar_url: e.target.value }))}
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>
              <div className="profile-form__group">
                <label className="profile-form__label">Bio</label>
                <textarea
                  className="profile-form__textarea"
                  value={form.bio}
                  onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                  placeholder="Tell the community about yourself and your love of Russian landmarks…"
                  rows={4}
                />
              </div>
              <div className="profile-form__actions">
                <button type="submit" className="profile-form__save" disabled={saving}>
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
                <button type="button" className="profile-form__cancel" onClick={() => setEditMode(false)}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-details">
              <div className="profile-detail-row">
                <span className="profile-detail-label">Username</span>
                <span className="profile-detail-value">@{username}</span>
              </div>
              <div className="profile-detail-row">
                <span className="profile-detail-label">Email</span>
                <span className="profile-detail-value">{profile.user?.email || '—'}</span>
              </div>
              <div className="profile-detail-row">
                <span className="profile-detail-label">Full name</span>
                <span className="profile-detail-value">
                  {[profile.user?.first_name, profile.user?.last_name].filter(Boolean).join(' ') || '—'}
                </span>
              </div>
              <div className="profile-detail-row">
                <span className="profile-detail-label">Bio</span>
                <span className="profile-detail-value">{profile.bio || <em style={{color: 'var(--muted)'}}>Not set</em>}</span>
              </div>
              <div className="profile-detail-row">
                <span className="profile-detail-label">Comments posted</span>
                <span className="profile-detail-value profile-detail-value--highlight">{profile.comment_count}</span>
              </div>
            </div>
          )}
        </div>

        <div className="profile-danger">
          <button className="profile-danger__btn" onClick={handleLogout}>
            Sign out of account
          </button>
        </div>
      </div>
    </div>
  )
}
