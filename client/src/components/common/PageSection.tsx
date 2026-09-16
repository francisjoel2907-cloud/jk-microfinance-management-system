import type { ReactNode } from "react";

type PageSectionProps = {
  children: ReactNode;
  className?: string;
};

export const PageSection = ({ children, className = "" }: PageSectionProps) => {
  return (
    <section
      className={`
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
        p-4
        sm:p-6
        ${className}
      `}
    >
      {children}
    </section>
  );
};
