import { useState } from 'react'
import { useAuth, API } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import './LandmarkCard.css'

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export default function LandmarkCard({ landmark, onCommentAdded }) {
  const { user } = useAuth()
  const [expanded, setExpanded] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState(landmark.comments || [])
  const [submitting, setSubmitting] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  const submitComment = async (e) => {
    e.preventDefault()
    if (!commentText.trim()) return
    setSubmitting(true)
    try {
      const { data } = await API.post(`/landmarks/${landmark.id}/comments/`, { text: commentText })
      setComments(prev => [data, ...prev])
      setCommentText('')
      if (onCommentAdded) onCommentAdded()
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  const deleteComment = async (commentId) => {
    try {
      await API.delete(`/comments/${commentId}/`)
      setComments(prev => prev.filter(c => c.id !== commentId))
    } catch (err) {
      console.error(err)
    }
  }

  const fallbackSrc = `https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=800`

  return (
    <article className="landmark-card">
      <div className="landmark-card__image-wrap">
        {!imgLoaded && <div className="skeleton landmark-card__skeleton" />}
        <img
          src={imgError ? fallbackSrc : landmark.image_url}
          alt={landmark.name}
          className="landmark-card__image"
          style={{ opacity: imgLoaded ? 1 : 0 }}
          onLoad={() => setImgLoaded(true)}
          onError={() => { setImgError(true); setImgLoaded(true) }}
        />
        <div className="landmark-card__number">{String(landmark.order).padStart(2, '0')}</div>
      </div>

      <div className="landmark-card__body">
        <h3 className="landmark-card__name">{landmark.name}</h3>
        {landmark.address && (
          <p className="landmark-card__address">
            <span className="landmark-card__address-icon">⌖</span>
            {landmark.address}
          </p>
        )}
        <p className="landmark-card__desc">{landmark.description}</p>

        <button
          className="landmark-card__toggle"
          onClick={() => setExpanded(!expanded)}
        >
          <span>{expanded ? 'Скрыть' : 'Показать'} комментарии</span>
          <span className="landmark-card__count">{comments.length}</span>
          <span className={`landmark-card__chevron ${expanded ? 'up' : ''}`}>▾</span>
        </button>

        {expanded && (
          <div className="landmark-card__comments">
            {user ? (
              <form className="comment-form" onSubmit={submitComment}>
                <div className="comment-form__avatar">{user.username?.[0]?.toUpperCase() || '?'}</div>
                <div className="comment-form__input-wrap">
                  <textarea
                    className="comment-form__textarea"
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    placeholder="Поделитесь впечатлениями об этом месте…"
                    rows={2}
                  />
                  <button
                    type="submit"
                    className="comment-form__submit"
                    disabled={submitting || !commentText.trim()}
                  >
                    {submitting ? '…' : 'Отправить'}
                  </button>
                </div>
              </form>
            ) : (
              <p className="comment-login-prompt">
                <Link to="/login">Войдите</Link>, чтобы оставить комментарий.
              </p>
            )}

            <div className="comments-list">
              {comments.length === 0 && (
                <p className="comments-empty">Комментариев пока нет. Будьте первым!</p>
              )}
              {comments.map(comment => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-item__avatar">
                    {comment.user.username[0].toUpperCase()}
                  </div>
                  <div className="comment-item__content">
                    <div className="comment-item__meta">
                      <strong className="comment-item__author">{comment.user.username}</strong>
                      <span className="comment-item__time">{timeAgo(comment.created_at)}</span>
                    </div>
                    <p className="comment-item__text">{comment.text}</p>
                  </div>
                  {user && (user.id === comment.user.id || user.user?.id === comment.user.id) && (
                    <button
                      className="comment-item__delete"
                      onClick={() => deleteComment(comment.id)}
                      title="Delete comment"
                    >×</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
