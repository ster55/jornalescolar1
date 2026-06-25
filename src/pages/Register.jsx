import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../services/auth.js'
import './AuthPages.css'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    if (form.password !== form.confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }

    if (form.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    setLoading(true)
    try {
      await registerUser(form.name, form.email, form.password)
      setSuccess(true)
      setTimeout(() => navigate('/login'), 2000)
    } catch (err) {
      const msg = err.response?.data?.message || 'Erro ao criar conta. Tente novamente.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <div className="auth-header">
          <h1 className="auth-title">📰 JornalTech</h1>
          <p className="auth-subtitle">Crie sua conta</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && (
          <div className="alert alert-success">
            Conta criada com sucesso! Redirecionando para o login...
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome completo</label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control"
              placeholder="Seu nome"
              value={form.name}
              onChange={handleChange}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              placeholder="seu@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              placeholder="Mínimo 6 caracteres"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar senha</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="form-control"
              placeholder="Repita a senha"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary auth-submit"
            disabled={loading || success}
          >
            {loading ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>

        <p className="auth-footer">
          Já tem conta?{' '}
          <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  )
}