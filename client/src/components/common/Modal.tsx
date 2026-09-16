import { type ReactNode } from "react";
import { X } from "lucide-react";

type ModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export const Modal = ({ open, title, onClose, children }: ModalProps) => {
  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
        p-4
      "
      onClick={onClose}
    >
      <div
        className="
          w-full
          max-w-2xl
          rounded-2xl
          bg-white
          shadow-2xl
          overflow-hidden
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-200
            px-6
            py-4
          "
        >
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>

          <button
            onClick={onClose}
            className="
              rounded-lg
              p-2
              hover:bg-slate-100
              transition
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <div
          className="
            max-h-[80vh]
            overflow-y-auto
            p-6
          "
        >
          {children}
        </div>
      </div>
    </div>
  );
};
