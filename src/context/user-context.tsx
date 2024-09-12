"use client";
import { useAuthenticated } from "@/hooks/use-authenticated";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Definisikan tipe untuk data user
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  avatarUrl?: string;
}

// Definisikan tipe untuk context value
interface UserContextValue {
  user: User | null;
  isLoading: boolean;
  logout: () => void;
}

// Buat context dengan tipe yang sesuai
const UserContext = createContext<UserContextValue | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, logout } = useAuthenticated();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (data?.user) {
      setUser(data.user);
    }
  }, [data]);

  // Pastikan tipe dari `value` sesuai dengan `UserContextValue`
  return (
    <UserContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook untuk menggunakan UserContext
export const useUser = () => {
  const context = useContext(UserContext);

  if (context === null) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
