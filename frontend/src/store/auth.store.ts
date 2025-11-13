import { create } from 'zustand';

type User = {
  id: number;
  nomComplet: string;
  role: string;
  serviceId?: number | null;
};

type AuthState = {
  token?: string;
  user?: User;
  setSession: (token: string, user: User) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: sessionStorage.getItem('looncorp_token') || undefined,
  user: undefined,
  setSession: (token, user) => {
    sessionStorage.setItem('looncorp_token', token);
    set({ token, user });
  },
  clearSession: () => {
    sessionStorage.removeItem('looncorp_token');
    set({ token: undefined, user: undefined });
  },
}));
