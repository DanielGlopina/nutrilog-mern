import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  user: {
    email: string;
    name: string;
    avatar: string;
  } | null;
  token: string | null;
  isAuthenticated: boolean;
  isChecking: boolean;
  setIsChecking: (state: boolean) => void;
  setToken: (token: string) => void;
  setLogout: () => void;
};
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isChecking: true,

      setIsChecking: (state) => {
        set({ isChecking: state });
      },

      setToken: (newToken) => {
        set({ token: newToken, isAuthenticated: true });
      },

      setLogout: () => {
        set({ token: null, isAuthenticated: false, user: null });
      },
    }),
    {
      name: "auth-storage",

      // Persist session data only; transient loading state is recalculated on startup.
      partialize: (state) => ({
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    },
  ),
);
