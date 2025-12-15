import { create } from "zustand";
import { User, CheckoutLine, Checkout } from "@/gql/graphql";

interface UserStore {
  user: User | null;
  lines: CheckoutLine[];
  checkoutData: Omit<Checkout, "lines"> | null;
  setCheckoutData: (c: Omit<Checkout, "lines"> | null) => void;
  setUser: (u: User | null) => void;
  setLines: (l: CheckoutLine[]) => void;
  addLine: (line: CheckoutLine) => void;
  removeLine: (lineId: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  checkoutData: null,
  setCheckoutData: (c) => set({ checkoutData: c }),
  lines: [],
  setUser: (u) => set({ user: u }),
  setLines: (l) => set({ lines: l }),
  addLine: (line) =>
    set((state) => ({
      lines: [...state.lines, line],
    })),
  removeLine: (lineId) =>
    set((state) => ({
      lines: state.lines.filter((line) => line.id !== lineId),
    })),
}));
