import api from './Api.js'

export async function getPosts(page = 0, size = 10, category = '') {
  const params = { page, size }
  if (category) params.category = category
  const response = await api.get('/posts', { params })
  return response.data
  // Retorna: { content: [...], totalPages, totalElements }
}

export async function getPostById(id) {
  const response = await api.get(`/posts/${id}`)
  return response.data
}

export async function createPost(postData) {
  // postData: { title, summary, content, categoryId, imageUrl? }
  const response = await api.post('/posts', postData)
  return response.data
}

export async function updatePost(id, postData) {
  const response = await api.put(`/posts/${id}`, postData)
  return response.data
}

export async function deletePost(id) {
  await api.delete(`/posts/${id}`)
}

export async function getCategories() {
  const response = await api.get('/categories')
  return response.data
}

// Comentários
export async function getComments(postId) {
  const response = await api.get(`/posts/${postId}/comments`)
  return response.data
}

export async function addComment(postId, content) {
  const response = await api.post(`/posts/${postId}/comments`, { content })
  return response.data
}

export async function approveComment(commentId) {
  const response = await api.patch(`/comments/${commentId}/approve`)
  return response.data
}

export async function deleteComment(commentId) {
  await api.delete(`/comments/${commentId}`)
}

// Painel Admin
export async function getPendingComments() {
  const response = await api.get('/admin/comments/pending')
  return response.data
}

export async function getAllUsers() {
  const response = await api.get('/admin/users')
  return response.data
}