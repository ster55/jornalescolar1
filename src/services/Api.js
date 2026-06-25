import axios from 'axios'

// Altere para a URL do seu backend Spring Boot
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Adiciona o token JWT em todas as requisições automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jornaltech-token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Trata erros globalmente (ex: token expirado)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido — redireciona para login
      localStorage.removeItem('jornaltech-token')
      localStorage.removeItem('jornaltech-user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api