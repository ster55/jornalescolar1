import { useState, useEffect } from 'react'
import { getPosts, createPost, updatePost, deletePost, getCategories } from '../services/posts.js'
import { useAuth } from '../context/AuthContext.jsx'
import './EditorPanel.css'

const EMPTY_FORM = { title: '', summary: '', content: '', categoryId: '', imageUrl: '' }

export default function EditorPanel() {
  const { user } = useAuth()
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    try {
      const [postsData, catsData] = await Promise.all([
        getPosts(0, 50),
        getCategories(),
      ])
      setPosts(postsData.content || postsData)
      setCategories(catsData)
    } catch {
      setError('Erro ao carregar dados.')
    } finally {
      setLoading(false)
    }
  }

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleEdit(post) {
    setForm({
      title: post.title,
      summary: post.summary,
      content: post.content,
      categoryId: post.category?.id || '',
      imageUrl: post.imageUrl || '',
    })
    setEditingId(post.id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleCancel() {
    setForm(EMPTY_FORM)
    setEditingId(null)
    setShowForm(false)
    setError(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(null)

    try {
      if (editingId) {
        await updatePost(editingId, form)
        setSuccess('Publicação atualizada com sucesso!')
      } else {
        await createPost(form)
        setSuccess('Publicação criada com sucesso!')
      }
      handleCancel()
      loadData()
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao salvar publicação.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Tem certeza que deseja excluir esta publicação?')) return
    try {
      await deletePost(id)
      setSuccess('Publicação excluída.')
      loadData()
    } catch {
      setError('Erro ao excluir publicação.')
    }
  }

  return (
    <div className="editor-page">
      <div className="container">
        <div className="editor-header">
          <div>
            <h1 className="editor-title">Painel do Editor</h1>
            <p className="editor-subtitle">Olá, {user?.name}!</p>
          </div>
          {!showForm && (
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
              + Nova publicação
            </button>
          )}
        </div>

        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-error">{error}</div>}

        {/* Formulário de criação/edição */}
        {showForm && (
          <div className="editor-form card">
            <h2 className="form-section-title">
              {editingId ? 'Editar publicação' : 'Nova publicação'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group form-full">
                  <label htmlFor="title">Título</label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    className="form-control"
                    placeholder="Título da publicação"
                    value={form.title}
                    onChange={handleChange}
                    required
                    autoFocus
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="categoryId">Categoria</label>
                  <select
                    id="categoryId"
                    name="categoryId"
                    className="form-control"
                    value={form.categoryId}
                    onChange={handleChange}
                  >
                    <option value="">Sem categoria</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="imageUrl">URL da imagem (opcional)</label>
                  <input
                    id="imageUrl"
                    name="imageUrl"
                    type="url"
                    className="form-control"
                    placeholder="https://..."
                    value={form.imageUrl}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group form-full">
                  <label htmlFor="summary">Resumo</label>
                  <textarea
                    id="summary"
                    name="summary"
                    className="form-control"
                    rows={2}
                    placeholder="Breve descrição da publicação"
                    value={form.summary}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group form-full">
                  <label htmlFor="content">Conteúdo</label>
                  <textarea
                    id="content"
                    name="content"
                    className="form-control"
                    rows={10}
                    placeholder="Conteúdo completo da publicação (HTML é aceito)"
                    value={form.content}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving ? 'Salvando...' : editingId ? 'Salvar alterações' : 'Publicar'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de publicações */}
        <section className="posts-list-section">
          <h2 className="section-title">Minhas publicações</h2>

          {loading ? (
            <div className="loading"><div className="spinner" /></div>
          ) : posts.length === 0 ? (
            <div className="empty-state">
              <p>Nenhuma publicação ainda. Crie a primeira!</p>
            </div>
          ) : (
            <div className="posts-table">
              {posts.map(post => (
                <div key={post.id} className="post-row card">
                  <div className="post-row-info">
                    {post.category && (
                      <span className="badge badge-accent">{post.category.name}</span>
                    )}
                    <h3 className="post-row-title">{post.title}</h3>
                    <p className="post-row-meta">
                      {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="post-row-actions">
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => handleEdit(post)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(post.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}