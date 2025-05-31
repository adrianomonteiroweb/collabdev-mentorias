"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

import { createSession, destroySession, getSession } from "@/actions/auth";

interface AuthContextType {
  user: any | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      setIsLoading(true);
      const session: any = await getSession();

      if (session?.payload) {
        setUser(session.payload as any);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };

    loadSession();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    const res = await createSession(email, password);

    if (res.status === 200) {
      const session: any = await getSession();

      if (session?.payload) {
        setUser(session.payload as any);
        setIsLoading(false);
        return true;
      }
    }

    setIsLoading(false);
    return false;
  };

  const logout = async () => {
    setIsLoading(true);
    await destroySession();
    setUser(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
