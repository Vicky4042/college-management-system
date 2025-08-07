// API service for backend communication
const API_BASE_URL = 'http://localhost:8080/api';

// Helper function for making authenticated requests
const makeRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('authToken');
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    if (response.status === 401) {
      // Handle unauthorized - redirect to login
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/';
      throw new Error('Unauthorized');
    }
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  return response.json();
};

// Helper function for non-authenticated requests
const makePublicRequest = async (endpoint: string, options: RequestInit = {}) => {
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  return response.json();
};

export const apiService = {
  // Authentication endpoints
  auth: {
    login: (credentials: { email: string; password: string }) =>
      makePublicRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
    
    register: (userData: { email: string; password: string; name?: string }) =>
      makePublicRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      }),
    
    logout: () =>
      makeRequest('/auth/logout', { method: 'POST' }),
    
    refreshToken: () =>
      makeRequest('/auth/refresh', { method: 'POST' }),
    
    getCurrentUser: () =>
      makeRequest('/auth/me'),
  },

  // Student endpoints
  students: {
    getAll: () => makeRequest('/students'),
    getById: (id: string) => makeRequest(`/students/${id}`),
    search: (query: string) => makeRequest(`/students/search?q=${encodeURIComponent(query)}`),
    create: (student: any) => makeRequest('/students', {
      method: 'POST',
      body: JSON.stringify(student),
    }),
    update: (id: string, student: any) => makeRequest(`/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(student),
    }),
    delete: (id: string) => makeRequest(`/students/${id}`, {
      method: 'DELETE',
    }),
  },

  // Student marks endpoints
  marks: {
    getByStudentId: (studentId: string) => makeRequest(`/students/${studentId}/marks`),
    search: (query: string) => makeRequest(`/marks/search?q=${encodeURIComponent(query)}`),
    create: (marks: any) => makeRequest('/marks', {
      method: 'POST',
      body: JSON.stringify(marks),
    }),
    update: (id: string, marks: any) => makeRequest(`/marks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(marks),
    }),
  },

  // Course endpoints
  courses: {
    getAll: () => makeRequest('/courses'),
    getById: (id: string) => makeRequest(`/courses/${id}`),
    getByDepartment: (department: string) => makeRequest(`/courses/department/${department}`),
    create: (course: any) => makeRequest('/courses', {
      method: 'POST',
      body: JSON.stringify(course),
    }),
    update: (id: string, course: any) => makeRequest(`/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(course),
    }),
    delete: (id: string) => makeRequest(`/courses/${id}`, {
      method: 'DELETE',
    }),
  },

  // Fee endpoints
  fees: {
    getAll: () => makeRequest('/fees'),
    getByStudentId: (studentId: string) => makeRequest(`/fees/student/${studentId}`),
    getSummary: () => makeRequest('/fees/summary'),
    search: (query: string) => makeRequest(`/fees/search?q=${encodeURIComponent(query)}`),
    create: (fee: any) => makeRequest('/fees', {
      method: 'POST',
      body: JSON.stringify(fee),
    }),
    updatePayment: (id: string, payment: any) => makeRequest(`/fees/${id}/payment`, {
      method: 'POST',
      body: JSON.stringify(payment),
    }),
  },

  // Dashboard endpoints
  dashboard: {
    getStats: () => makeRequest('/dashboard/stats'),
    getRecentActivities: () => makeRequest('/dashboard/activities'),
  },

  // Department endpoints
  departments: {
    getAll: () => makeRequest('/departments'),
  },
};