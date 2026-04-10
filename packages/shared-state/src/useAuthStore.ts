import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  name: string;
  role: 'admin' | 'fan';
}

interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (userData) => set({ user: userData }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'wc2026-global-auth', // Tên key duy nhất lưu trong localStorage
    }
  )
);