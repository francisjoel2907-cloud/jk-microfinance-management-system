import type { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
};

export const StatCard = ({
  title,
  value,
  description,
  icon,
}: StatCardProps) => {
  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
        p-6
        transition-all
        duration-200
        hover:shadow-md
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <p
            className="
              text-sm
              font-medium
              text-slate-500
            "
          >
            {title}
          </p>

          <h3
            className="
              mt-2
              text-3xl
              font-bold
              text-slate-900
            "
          >
            {value}
          </h3>

          {description && (
            <p
              className="
                mt-2
                text-sm
                text-slate-500
              "
            >
              {description}
            </p>
          )}
        </div>

        {icon && (
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-green-100
              text-green-600
            "
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};
