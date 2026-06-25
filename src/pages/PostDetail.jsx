import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPostById, getComments, addComment } from '../services/posts.js'
import { useAuth } from '../context/AuthContext.jsx'
import './PostDetail.css'

export default function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(true)
  const [commentLoading, setCommentLoading] = useState(false)
  const [error, setError] = useState(null)
  const [commentSuccess, setCommentSuccess] = useState(false)

  useEffect(() => {
    loadPost()
  }, [id])

  async function loadPost() {
    setLoading(true)
    try {
      const [postData, commentsData] = await Promise.all([
        getPostById(id),
        getComments(id),
      ])
      setPost(postData)
      setComments(commentsData)
    } catch {
      setError('Publicação não encontrada.')
    } finally {
      setLoading(false)
    }
  }

  async function handleCommentSubmit(e) {
    e.preventDefault()
    if (!newComment.trim()) return

    setCommentLoading(true)
    try {
      await addComment(id, newComment.trim())
      setNewComment('')
      setCommentSuccess(true)
      setTimeout(() => setCommentSuccess(false), 4000)
    } catch {
      alert('Erro ao enviar comentário.')
    } finally {
      setCommentLoading(false)
    }
  }

  if (loading) return <div className="loading"><div className="spinner" /></div>
  if (error) return (
    <div className="container" style={{ padding: '3rem 1rem' }}>
      <div className="alert alert-error">{error}</div>
      <button className="btn btn-outline" onClick={() => navigate('/')}>← Voltar</button>
    </div>
  )

  const formattedDate = new Date(post.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric'
  })

  return (
    <div className="post-detail-page">
      <div className="container">
        <button className="btn-back" onClick={() => navigate(-1)}>← Voltar</button>

        <article className="post-article">
          {post.category && (
            <span className="badge badge-accent">{post.category.name}</span>
          )}
          <h1 className="post-title">{post.title}</h1>

          <div className="post-meta">
            <span>Por <strong>{post.author?.name || 'Redação'}</strong></span>
            <span>·</span>
            <span>{formattedDate}</span>
          </div>

          {post.imageUrl && (
            <div className="post-cover">
              <img src={post.imageUrl} alt={post.title} />
            </div>
          )}

          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Seção de comentários */}
        <section className="comments-section">
          <h2 className="comments-title">
            Comentários ({comments.filter(c => c.approved).length})
          </h2>

          {/* Formulário - só para usuários logados */}
          {user ? (
            <form className="comment-form card" onSubmit={handleCommentSubmit}>
              {commentSuccess && (
                <div className="alert alert-success">
                  Comentário enviado! Aguardando aprovação do administrador.
                </div>
              )}
              <div className="form-group">
                <label htmlFor="comment">Seu comentário</label>
                <textarea
                  id="comment"
                  className="form-control"
                  rows={3}
                  placeholder="Escreva seu comentário..."
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-sm"
                disabled={commentLoading}
              >
                {commentLoading ? 'Enviando...' : 'Enviar comentário'}
              </button>
            </form>
          ) : (
            <div className="comment-login-prompt card">
              <p>
                <a href="/login">Entre</a> ou <a href="/register">cadastre-se</a> para comentar.
              </p>
            </div>
          )}

          {/* Lista de comentários aprovados */}
          <div className="comments-list">
            {comments.filter(c => c.approved).length === 0 ? (
              <div className="empty-state">
                <p>Nenhum comentário ainda. Seja o primeiro!</p>
              </div>
            ) : (
              comments
                .filter(c => c.approved)
                .map(comment => (
                  <div key={comment.id} className="comment-item card">
                    <div className="comment-header">
                      <strong>{comment.author?.name || 'Anônimo'}</strong>
                      <span className="comment-date">
                        {new Date(comment.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <p className="comment-text">{comment.content}</p>
                  </div>
                ))
            )}
          </div>
        </section>
      </div>
    </div>
  )
}