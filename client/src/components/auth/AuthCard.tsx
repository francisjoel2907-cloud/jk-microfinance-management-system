import { cn } from "@/utils/cn";

interface AuthCardProps {
  children: React.ReactNode;

  size?: "sm" | "md" | "lg" | "xl";
}

export function AuthCard({ children, size = "md" }: AuthCardProps) {
  const sizes = {
    sm: "max-w-sm",

    md: "max-w-md",

    lg: "max-w-xl",

    xl: "max-w-2xl",
  };

  return (
    <div
      className={cn(
        "w-full rounded-3xl bg-white shadow-xl p-6 sm:p-8",
        sizes[size],
      )}
    >
      {children}
    </div>
  );
}
