import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '@/services/apiService';

interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; name?: string }) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      // Login user
      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const { user, token } = await authService.login({ email, password });
          localStorage.setItem('authToken', token);
          localStorage.setItem('user', JSON.stringify(user));
          set({ user, token, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          console.error("Login failed:", error);
          throw error;
        }
      },

      // Register user
      register: async (data) => {
        set({ isLoading: true });
        try {
          const { user, token } = await authService.register(data);
          localStorage.setItem('authToken', token);
          localStorage.setItem('user', JSON.stringify(user));
          set({ user, token, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          console.error("Registration failed:", error);
          throw error;
        }
      },

      // Logout user
      logout: async () => {
        set({ isLoading: true });
        try {
          await authService.logout();
        } finally {
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          set({ user: null, token: null, isAuthenticated: false, isLoading: false });
        }
      },

      // Check if user is authenticated
      checkAuth: async () => {
        set({ isLoading: true });
        const token = localStorage.getItem('authToken');
        const userStr = localStorage.getItem('user');

        if (!token || !userStr) {
          set({ user: null, token: null, isAuthenticated: false, isLoading: false });
          return;
        }

        try {
          const user = await authService.getCurrentUser(); // call backend to validate token
          set({ user, token, isAuthenticated: true, isLoading: false });
        } catch (error) {
          console.error("Auth check failed:", error);
          localStorage.removeItem('Token');
          localStorage.removeItem('user');
          set({ user: null, token: null, isAuthenticated: false, isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
