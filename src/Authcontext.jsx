import { createContext, useContext, useState, useEffect } from 'react'
import { loginUser, logoutUser } from '../services/auth.js'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('jornaltech-token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Recupera dados do usuário salvo no localStorage
    const savedUser = localStorage.getItem('jornaltech-user')
    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser))
      } catch {
        localStorage.removeItem('jornaltech-user')
      }
    }
    setLoading(false)
  }, [])

  async function login(email, password) {
    const data = await loginUser(email, password)
    // data esperado: { token, user: { id, name, email, role } }
    setToken(data.token)
    setUser(data.user)
    localStorage.setItem('jornaltech-token', data.token)
    localStorage.setItem('jornaltech-user', JSON.stringify(data.user))
    return data
  }

  function logout() {
    logoutUser()
    setToken(null)
    setUser(null)
    localStorage.removeItem('jornaltech-token')
    localStorage.removeItem('jornaltech-user')
  }

  function hasRole(...roles) {
    return user && roles.includes(user.role)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return context
}