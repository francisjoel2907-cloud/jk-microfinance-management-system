import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f4f8f5] flex items-center justify-center px-4 py-8">
      {children}
    </div>
  );
}
