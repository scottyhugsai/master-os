/**
 * Auth Store - Zustand
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { User, AuthState } from '@/types';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error?: string) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: undefined,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: undefined });
        try {
          // TODO: Call API endpoint
          // const response = await fetch('/api/auth/login', { ... })
          // const user = await response.json();
          // Mock user for now
          const mockUser: User = {
            id: '1',
            email,
            name: 'John Doe',
            role: 'admin',
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          set({ user: mockUser, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false,
          });
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: undefined,
        });
      },

      setUser: (user) => {
        set({ user, isAuthenticated: !!user });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      setError: (error) => {
        set({ error });
      },

      clearError: () => {
        set({ error: undefined });
      },
    }),
    { name: 'AuthStore' }
  )
);
