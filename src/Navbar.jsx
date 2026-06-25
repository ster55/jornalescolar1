import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import ThemeToggle from './Themetoggle.jsx'
import './Navbar.css'

export default function Navbar() {
  const { user, logout, hasRole } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand">
          📰 <span>JornalTech</span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className="nav-link">Início</Link>

          {user && hasRole('REPORTER', 'EDITOR', 'ADMIN') && (
            <Link to="/editor" className="nav-link">Painel Editor</Link>
          )}

          {user && hasRole('ADMIN') && (
            <Link to="/admin" className="nav-link">Admin</Link>
          )}
        </div>

        <div className="navbar-actions">
          <ThemeToggle />

          {user ? (
            <div className="navbar-user">
              <span className="user-name">Olá, {user.name}</span>
              <span className="badge badge-accent">{user.role}</span>
              <button className="btn btn-outline btn-sm" onClick={handleLogout}>
                Sair
              </button>
            </div>
          ) : (
            <div className="navbar-auth">
              <Link to="/login" className="btn btn-outline btn-sm">Entrar</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Cadastrar</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}