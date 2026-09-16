import { Landmark } from "lucide-react";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <>
      <div className="mb-6 flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-green-600 shadow-lg">
          <Landmark className="text-white" size={40} />
        </div>
      </div>

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          {title}
        </h1>

        <p className="mt-2 text-sm text-slate-500 sm:text-base">{subtitle}</p>
      </div>
    </>
  );
}
