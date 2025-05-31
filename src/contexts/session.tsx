"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "@/actions/users";
import LoadingComponent from "@/components/app/loading-logo";
import { useRouter } from "next/navigation";

export type SessionType = {
  id?: number;
  name: string;
};

type Props = {
  children: React.ReactNode;
};

type ProviderValue = {
  user: any;
  loading: boolean;
};

const SessionContext = createContext<ProviderValue | undefined>(undefined);

export function SessionProvider({ children }: Props) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getMe()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  if (!user) {
    router.push("/signin");
  }

  const provider_value: ProviderValue = {
    user,
    loading,
  };

  return (
    <SessionContext.Provider value={provider_value}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSessionContext() {
  const context = useContext(SessionContext);

  if (context === undefined) {
    throw new Error("useSessionContext must be used within a SessionProvider");
  }

  return context;
}
