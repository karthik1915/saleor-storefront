import { User } from "@/gql/graphql";
import { create } from "zustand";

type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useAuthState = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
