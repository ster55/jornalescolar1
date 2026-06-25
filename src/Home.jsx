import { useState, useEffect } from 'react'
import { getPosts, getCategories } from '../services/posts.js'
import PostCard from '../components/PostCard.jsx'
import './Home.css'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadCategories()
  }, [])

  useEffect(() => {
    loadPosts()
  }, [page, selectedCategory])

  async function loadCategories() {
    try {
      const data = await getCategories()
      setCategories(data)
    } catch {
      // Silencia erro de categorias, não é crítico
    }
  }

  async function loadPosts() {
    setLoading(true)
    setError(null)
    try {
      const data = await getPosts(page, 9, selectedCategory)
      setPosts(data.content || data)
      setTotalPages(data.totalPages || 1)
    } catch (err) {
      setError('Não foi possível carregar as publicações. Verifique se o backend está ativo.')
    } finally {
      setLoading(false)
    }
  }

  function handleCategoryChange(cat) {
    setSelectedCategory(cat)
    setPage(0)
  }

  return (
    <div className="home-page">
      {/* Header */}
      <header className="home-header">
        <div className="container">
          <h1 className="home-title">JornalTech</h1>
          <p className="home-subtitle">Notícias, eventos e conteúdos do mundo tech escolar</p>
        </div>
      </header>

      <div className="container home-content">
        {/* Filtro por categoria */}
        {categories.length > 0 && (
          <div className="category-filter">
            <button
              className={`filter-btn ${selectedCategory === '' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('')}
            >
              Todas
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {/* Posts */}
        {loading ? (
          <div className="loading"><div className="spinner" /></div>
        ) : error ? (
          <div className="alert alert-error">{error}</div>
        ) : posts.length === 0 ? (
          <div className="empty-state">
            <p>Nenhuma publicação encontrada.</p>
          </div>
        ) : (
          <>
            <div className="posts-grid">
              {posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Paginação */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="btn btn-outline btn-sm"
                  disabled={page === 0}
                  onClick={() => setPage(p => p - 1)}
                >
                  ← Anterior
                </button>
                <span className="page-info">Página {page + 1} de {totalPages}</span>
                <button
                  className="btn btn-outline btn-sm"
                  disabled={page >= totalPages - 1}
                  onClick={() => setPage(p => p + 1)}
                >
                  Próxima →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}