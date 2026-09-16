import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { ROUTES } from "@/constants/routes";

interface AuthFooterProps {
  question: string;
  linkText: string;
  linkTo: string;
}

export function AuthFooter({ question, linkText, linkTo }: AuthFooterProps) {
  return (
    <div className="mt-8 text-center">
      <p className="text-slate-600">
        {question}{" "}
        <Link
          to={linkTo}
          className="font-semibold text-green-600 hover:underline"
        >
          {linkText}
        </Link>
      </p>

      <Link
        to={ROUTES.HOME}
        className="mt-3 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
      >
        <ArrowLeft size={16} />
        Back to home
      </Link>
    </div>
  );
}
