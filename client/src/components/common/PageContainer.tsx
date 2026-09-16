import type { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
};

export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <div
      className="
        flex
        flex-col
        gap-6
        p-4
        sm:p-6
        lg:p-8
        w-full
      "
    >
      {children}
    </div>
  );
};
