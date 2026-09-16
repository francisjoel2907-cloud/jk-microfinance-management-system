import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
};

export const PageHeader = ({ title, subtitle, action }: PageHeaderProps) => {
  return (
    <div
      className="
        flex
        flex-col
        gap-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <div>
        <h1
          className="
            text-2xl
            font-bold
            tracking-tight
            text-slate-900
            sm:text-3xl
          "
        >
          {title}
        </h1>

        {subtitle && (
          <p
            className="
              mt-1
              text-sm
              text-slate-500
              sm:text-base
            "
          >
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <div
          className="
            w-full
            sm:w-auto
            flex
            justify-start
            sm:justify-end
          "
        >
          {action}
        </div>
      )}
    </div>
  );
};
