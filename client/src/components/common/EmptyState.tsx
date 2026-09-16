import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
};

export const EmptyState = ({
  title,
  description,
  icon,
  action,
}: EmptyStateProps) => {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-3xl
        border
        border-dashed
        border-slate-300
        bg-white
        px-6
        py-16
        text-center
      "
    >
      {icon && (
        <div
          className="
            mb-6
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-full
            bg-green-100
            text-green-600
          "
        >
          {icon}
        </div>
      )}

      <h2
        className="
          text-2xl
          font-semibold
          text-slate-900
        "
      >
        {title}
      </h2>

      <p
        className="
          mt-3
          max-w-md
          text-slate-500
        "
      >
        {description}
      </p>

      {action && <div className="mt-8">{action}</div>}
    </div>
  );
};
