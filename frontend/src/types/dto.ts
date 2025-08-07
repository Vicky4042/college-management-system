// DTO types for API requests and responses
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

export interface ErrorResponse {
  message: string
}

export interface UserResponse {
  id: string
  email: string
  role?: string
}