import { Eye, Pencil, FileText } from "lucide-react";

type CustomerActionsProps = {
  onView: () => void;
  onEdit: () => void;
  onStatement: () => void;
};

const CustomerActions = ({
  onView,
  onEdit,
  onStatement,
}: CustomerActionsProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={onView}
        className="
          rounded-lg
          p-2
          text-blue-600
          transition
          hover:bg-blue-50
        "
        title="View Customer"
      >
        <Eye size={18} />
      </button>

      <button
        onClick={onEdit}
        className="
          rounded-lg
          p-2
          text-amber-600
          transition
          hover:bg-amber-50
        "
        title="Edit Customer"
      >
        <Pencil size={18} />
      </button>

      <button
        onClick={onStatement}
        className="
          rounded-lg
          p-2
          text-green-600
          transition
          hover:bg-green-50
        "
        title="Customer Statement"
      >
        <FileText size={18} />
      </button>
    </div>
  );
};

export default CustomerActions;
