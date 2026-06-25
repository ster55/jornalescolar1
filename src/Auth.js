import api from './Api.js'

export async function loginUser(email, password) {
  const response = await api.post('/auth/login', { email, password })
  return response.data
  // Retorna: { token: "...", user: { id, name, email, role } }
}

export async function registerUser(name, email, password) {
  const response = await api.post('/auth/register', { name, email, password })
  return response.data
}

export function logoutUser() {
  // JWT é stateless — só removemos do localStorage
  // Se o backend tiver blacklist de tokens, chame o endpoint aqui:
  // await api.post('/auth/logout')
}

export async function getProfile() {
  const response = await api.get('/auth/me')
  return response.data
}