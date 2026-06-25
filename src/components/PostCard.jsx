import { Link } from 'react-router-dom'
import './PostCard.css'

export default function PostCard({ post }) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return (
    <article className="post-card card">
      {post.imageUrl && (
        <div className="post-card-image">
          <img src={post.imageUrl} alt={post.title} loading="lazy" />
        </div>
      )}
      <div className="post-card-body">
        {post.category && (
          <span className="badge badge-accent">{post.category.name}</span>
        )}
        <h2 className="post-card-title">
          <Link to={`/post/${post.id}`}>{post.title}</Link>
        </h2>
        <p className="post-card-summary">{post.summary}</p>
        <div className="post-card-meta">
          <span className="post-author">Por {post.author?.name || 'Redação'}</span>
          <span className="post-date">{formattedDate}</span>
        </div>
      </div>
    </article>
  )
}