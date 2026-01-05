// src/services/apiService.ts
const API_BASE_URL = (import.meta as any).env.VITE_API_BASE_URL || 'http://localhost:3000/api';
// Helper for requests with token
const makeRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('authToken');
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };
  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  if (!response.ok) {
    const errorText = await response.text();
    if (response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/';
      throw new Error('Unauthorized');
    }
    throw new Error(errorText || response.statusText);
  }
  return response.json();
};

// Public API calls
const makePublicRequest = async (endpoint: string, options: RequestInit = {}) => {
  const config: RequestInit = {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  };
  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || response.statusText);
  }
  return response.json();
};

// ✅ AUTH API
export const authService = {
  login: (data: { email: string; password: string }) =>
    makePublicRequest('/auth/login', { method: 'POST', body: JSON.stringify(data) }),

  register: (data: { email: string; password: string; name?: string }) =>
    makePublicRequest('/auth/register', { method: 'POST', body: JSON.stringify(data) }),

  logout: () => makeRequest('/auth/logout', { method: 'POST' }),

  getCurrentUser: () => makeRequest('/auth/me'),
};

// ✅ OTHER MODULES
export const apiService = {
  students: {
    getAll: () => makeRequest('/students'),
    getById: (id: string) => makeRequest(`/students/${id}`),
    create: (data: any) => makeRequest('/students', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => makeRequest(`/students/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => makeRequest(`/students/${id}`, { method: 'DELETE' }),
  },

  courses: {
    getAll: () => makeRequest('/courses'),
    getById: (id: string) => makeRequest(`/courses/${id}`),
    create: (data: any) => makeRequest('/courses', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => makeRequest(`/courses/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => makeRequest(`/courses/${id}`, { method: 'DELETE' }),
  },

  fees: {
    getAll: () => makeRequest('/fees'),
    getByStudentId: (studentId: string) => makeRequest(`/fees/student/${studentId}`),
    create: (data: any) => makeRequest('/fees', { method: 'POST', body: JSON.stringify(data) }),
    updatePayment: (id: string, payment: any) => makeRequest(`/fees/${id}/payment`, { method: 'POST', body: JSON.stringify(payment) }),
  },

  marks: {
    getByStudentId: (studentId: string) => makeRequest(`/students/${studentId}/marks`),
    create: (data: any) => makeRequest('/marks', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => makeRequest(`/marks/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  },

  departments: {
    getAll: () => makeRequest('/departments'),
  },

  dashboard: {
    getStats: () => makeRequest('/dashboard/stats'),
    getRecentActivities: () => makeRequest('/dashboard/activities'),
  },
};
