import { AlertCircle, CheckCircle2, Info, TriangleAlert } from "lucide-react";

import { cn } from "@/utils/cn";

interface AlertProps {
  children: React.ReactNode;

  variant?: "error" | "success" | "warning" | "info";

  className?: string;
}

const variants = {
  error: {
    icon: AlertCircle,
    classes: "bg-red-50 border-red-200 text-red-700",
  },

  success: {
    icon: CheckCircle2,
    classes: "bg-green-50 border-green-200 text-green-700",
  },

  warning: {
    icon: TriangleAlert,
    classes: "bg-yellow-50 border-yellow-200 text-yellow-700",
  },

  info: {
    icon: Info,
    classes: "bg-blue-50 border-blue-200 text-blue-700",
  },
};

export function Alert({ children, variant = "info", className }: AlertProps) {
  const { icon: Icon, classes } = variants[variant];

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-2xl border p-4 text-sm",
        classes,
        className,
      )}
    >
      <Icon size={20} className="mt-0.5 shrink-0" />

      <div>{children}</div>
    </div>
  );
}
