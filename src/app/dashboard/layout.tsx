import type React from "react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { SessionProtector } from "@/components/app/session-provider";
import { AppSidebar } from "@/components/app/app-sidebar";
import { ThemeToggle } from "@/components/app/theme-toggle";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProtector>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1">
          <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger />
            <ThemeToggle />
          </header>
          <div className="p-6">{children}</div>
        </main>
      </SidebarProvider>
    </SessionProtector>
  );
}
