import { create } from 'zustand';
import type { User } from '../types/user';

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  isLoggedIn: () => boolean;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  setUser: (user) => {
    set({ user });
    if (user?.accessToken) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('accessToken', user.accessToken);
    }
  },
  clearUser: () => {
    set({ user: null });
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
  },
  isLoggedIn: () => !!get().user?.accessToken,
}));
