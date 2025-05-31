"use client";

import type React from "react";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

import { useAuth } from "./auth-provider";

interface SessionProtectorProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export function SessionProtector({
  children,
  requireAuth = true,
  redirectTo = "/signin",
}: SessionProtectorProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !user) {
        router.push(redirectTo);
      } else if (!requireAuth && user) {
        router.push("/dashboard");
      }
    }
  }, [user, isLoading, requireAuth, redirectTo, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (requireAuth && !user) {
    return null;
  }

  if (!requireAuth && user) {
    return null;
  }

  return <>{children}</>;
}
