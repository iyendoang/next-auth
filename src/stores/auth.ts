// src/store/auth.ts
import { getUser } from "@/services/me";
import { deleteCookie } from "cookies-next";
import { create } from "zustand";

interface AuthState {
  data: any | null;
  isLoading: boolean;
  error: string | null;
  getUserData: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  data: null,
  isLoading: false,
  error: null,

  // Function to fetch user data from the API
  getUserData: async () => {
    set({ isLoading: true, error: null });
    try {
      const userData = await getUser();
      set({ data: userData, isLoading: false });
    } catch (error) {
      set({ data: null, error: "Failed to fetch user", isLoading: false });
    }
  },

  // Function to handle logout
  logout: () => {
    set({ data: null });
    deleteCookie("token");
  },
}));
