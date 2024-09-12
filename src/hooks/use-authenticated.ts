// src/hooks/use-authenticated.ts
import { useAuthStore } from "@/stores/auth";
import { useEffect } from "react";

export function useAuthenticated() {
  const { data, getUserData, isLoading, logout } = useAuthStore((state) => ({
    data: state.data,
    getUserData: state.getUserData,
    isLoading: state.isLoading,
    logout: state.logout,
  }));

  // Automatically fetch data data when component mounts
  useEffect(() => {
    if (!data) {
      getUserData();
    }
  }, [data, getUserData]);

  return { data, isLoading, logout };
}
