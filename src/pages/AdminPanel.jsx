import { useState, useEffect } from 'react'
import { getPendingComments, approveComment, deleteComment, getAllUsers } from '../services/posts.js'
import './AdminPanel.css'

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('comments')
  const [pendingComments, setPendingComments] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    try {
      const [comments, usersData] = await Promise.all([
        getPendingComments(),
        getAllUsers(),
      ])
      setPendingComments(comments)
      setUsers(usersData)
    } catch {
      setError('Erro ao carregar dados do painel.')
    } finally {
      setLoading(false)
    }
  }

  async function handleApprove(commentId) {
    try {
      await approveComment(commentId)
      setPendingComments(prev => prev.filter(c => c.id !== commentId))
      showSuccess('Comentário aprovado!')
    } catch {
      setError('Erro ao aprovar comentário.')
    }
  }

  async function handleDeleteComment(commentId) {
    if (!confirm('Excluir este comentário?')) return
    try {
      await deleteComment(commentId)
      setPendingComments(prev => prev.filter(c => c.id !== commentId))
      showSuccess('Comentário excluído.')
    } catch {
      setError('Erro ao excluir comentário.')
    }
  }

  function showSuccess(msg) {
    setSuccess(msg)
    setTimeout(() => setSuccess(null), 3000)
  }

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1 className="admin-title">Painel Admin</h1>
          <p className="admin-subtitle">Gerencie usuários e comentários</p>
        </div>

        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-error">{error}</div>}

        {/* Abas */}
        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'comments' ? 'active' : ''}`}
            onClick={() => setActiveTab('comments')}
          >
            Comentários pendentes
            {pendingComments.length > 0 && (
              <span className="tab-badge">{pendingComments.length}</span>
            )}
          </button>
          <button
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Usuários
          </button>
        </div>

        {loading ? (
          <div className="loading"><div className="spinner" /></div>
        ) : (
          <>
            {/* Aba: Comentários */}
            {activeTab === 'comments' && (
              <section className="admin-section">
                {pendingComments.length === 0 ? (
                  <div className="empty-state">
                    <p>Nenhum comentário aguardando aprovação.</p>
                  </div>
                ) : (
                  <div className="comments-list">
                    {pendingComments.map(comment => (
                      <div key={comment.id} className="comment-card card">
                        <div className="comment-card-header">
                          <div>
                            <strong>{comment.author?.name || 'Anônimo'}</strong>
                            <span className="comment-on">
                              em "{comment.post?.title || 'Post'}"
                            </span>
                          </div>
                          <span className="comment-date">
                            {new Date(comment.createdAt).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <p className="comment-text">{comment.content}</p>
                        <div className="comment-actions">
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleApprove(comment.id)}
                          >
                            ✓ Aprovar
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            Rejeitar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Aba: Usuários */}
            {activeTab === 'users' && (
              <section className="admin-section">
                {users.length === 0 ? (
                  <div className="empty-state"><p>Nenhum usuário cadastrado.</p></div>
                ) : (
                  <div className="users-table">
                    <div className="users-table-header">
                      <span>Nome</span>
                      <span>E-mail</span>
                      <span>Perfil</span>
                      <span>Cadastro</span>
                    </div>
                    {users.map(u => (
                      <div key={u.id} className="user-row card">
                        <span className="user-name">{u.name}</span>
                        <span className="user-email">{u.email}</span>
                        <span className={`badge role-badge role-${u.role?.toLowerCase()}`}>
                          {u.role}
                        </span>
                        <span className="user-date">
                          {new Date(u.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}
          </>
        )}
      </div>
    </div>
  )
}