const USE_MOCK = true

const mockUsers = [
  { id: 1, name: 'Administrador', email: 'admin@jornaltech.com', password: 'admin123', role: 'ADMIN' },
  { id: 2, name: 'Editor Chefe', email: 'editor@jornaltech.com', password: 'editor123', role: 'EDITOR' },
  { id: 3, name: 'Repórter', email: 'reporter@jornaltech.com', password: 'reporter123', role: 'REPORTER' },
]

export async function loginUser(email, password) {
  if (USE_MOCK) {
    const user = mockUsers.find(u => u.email === email && u.password === password)
    if (!user) throw new Error('E-mail ou senha incorretos.')
    return {
      token: 'mock-jwt-token-' + user.id,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    }
  }
}

export async function registerUser(name, email, password) {
  if (USE_MOCK) {
    const exists = mockUsers.find(u => u.email === email)
    if (exists) throw new Error('E-mail já cadastrado.')
    const newUser = { id: mockUsers.length + 1, name, email, password, role: 'REPORTER' }
    mockUsers.push(newUser)
    return {
      token: 'mock-jwt-token-' + newUser.id,
      user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
    }
  }
}

export function logoutUser() {}