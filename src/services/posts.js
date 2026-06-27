import { mockPosts, mockCategories, mockComments } from './mockData.js'

const USE_MOCK = true

export async function getPosts(page = 0, size = 10, category = '') {
  if (USE_MOCK) {
    let filtered = mockPosts
    if (category) filtered = mockPosts.filter(p => p.category?.id === Number(category))
    const start = page * size
    const content = filtered.slice(start, start + size)
    return { content, totalPages: Math.ceil(filtered.length / size), totalElements: filtered.length }
  }
}

export async function getPostById(id) {
  if (USE_MOCK) {
    const post = mockPosts.find(p => p.id === Number(id))
    if (!post) throw new Error('Post não encontrado')
    return post
  }
}

export async function createPost(postData) {
  if (USE_MOCK) {
    const newPost = { id: mockPosts.length + 1, ...postData, author: { name: 'Você' }, category: mockCategories.find(c => c.id === Number(postData.categoryId)) || null, createdAt: new Date().toISOString() }
    mockPosts.unshift(newPost)
    return newPost
  }
}

export async function updatePost(id, postData) {
  if (USE_MOCK) {
    const index = mockPosts.findIndex(p => p.id === Number(id))
    if (index !== -1) { mockPosts[index] = { ...mockPosts[index], ...postData }; return mockPosts[index] }
  }
}

export async function deletePost(id) {
  if (USE_MOCK) {
    const index = mockPosts.findIndex(p => p.id === Number(id))
    if (index !== -1) mockPosts.splice(index, 1)
  }
}

export async function getCategories() {
  if (USE_MOCK) return mockCategories
}

export async function getComments(postId) {
  if (USE_MOCK) return mockComments
}

export async function addComment(postId, content) {
  if (USE_MOCK) {
    const newComment = { id: mockComments.length + 1, content, author: { name: 'Você' }, approved: false, createdAt: new Date().toISOString() }
    mockComments.push(newComment)
    return newComment
  }
}

export async function approveComment(commentId) {
  if (USE_MOCK) {
    const comment = mockComments.find(c => c.id === Number(commentId))
    if (comment) comment.approved = true
    return comment
  }
}

export async function deleteComment(commentId) {
  if (USE_MOCK) {
    const index = mockComments.findIndex(c => c.id === Number(commentId))
    if (index !== -1) mockComments.splice(index, 1)
  }
}

export async function getPendingComments() {
  if (USE_MOCK) return mockComments.filter(c => !c.approved)
}

export async function getAllUsers() {
  if (USE_MOCK) return [
    { id: 1, name: 'Administrador', email: 'admin@jornaltech.com', role: 'ADMIN', createdAt: '2026-01-01' },
    { id: 2, name: 'Editor Chefe', email: 'editor@jornaltech.com', role: 'EDITOR', createdAt: '2026-01-01' },
    { id: 3, name: 'Ana Silva', email: 'ana@jornaltech.com', role: 'REPORTER', createdAt: '2026-02-01' },
  ]
}