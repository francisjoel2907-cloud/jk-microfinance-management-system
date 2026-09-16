import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type KpiCardProps = {
  title: string;
  value: ReactNode;
  subtitle: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
};

const KpiCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg,
  iconColor,
}: KpiCardProps) => {
  return (
    <div
      className={cn(
        "rounded-3xl border border-slate-200 bg-white p-5",
        "shadow-sm transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-lg",
        "sm:p-6",
      )}
    >
      <div className="mb-4 flex items-start justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          {title}
        </p>

        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ backgroundColor: iconBg }}
        >
          <Icon size={24} color={iconColor} />
        </div>
      </div>

      <div className="mb-2">{value}</div>

      <p className="text-sm text-slate-500">{subtitle}</p>
    </div>
  );
};

export default KpiCard;
