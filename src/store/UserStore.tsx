import { create } from "zustand";
import { User, CheckoutLine } from "@/gql/graphql";

interface UserStore {
  user: User | null;
  lines: CheckoutLine[];
  setUser: (u: User | null) => void;
  setLines: (l: CheckoutLine[]) => void;
  removeLine: (lineId: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  lines: [],
  setUser: (u) => set({ user: u }),
  setLines: (l) => set({ lines: l }),
  removeLine: (lineId) =>
    set((state) => ({
      lines: state.lines.filter((line) => line.id !== lineId),
    })),
}));
