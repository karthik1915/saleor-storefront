import { create } from "zustand";

type User = {
  firstName?: string;
  lastName?: string;
  email: string;
  avatar?: {
    alt?: string;
    url?: string;
  };
};

type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useAuthState = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
