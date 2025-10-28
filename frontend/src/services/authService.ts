import api from './api'

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    email: string
    role?: string
  }
}

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post('/auth/login', credentials)

    // ✅ Save token in localStorage
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token)
    }

    return response.data
  },

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post('/auth/register', userData)

    // ✅ Save token after registration too
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token)
    }

    return response.data
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me')
    return response.data
  },

  // ✅ Add logout also
  logout() {
    localStorage.removeItem('token')
  }
}
