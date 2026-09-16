import { X, Printer } from "lucide-react";
import { Button } from "@/components/common/Button";

type Props = {
  open: boolean;
  onClose: () => void;
  receipt: any;
};

const ReceiptModal = ({ open, onClose, receipt }: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-lg font-bold">Payment Receipt</h2>

          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <div className="space-y-4 p-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-green-600">MICROFINANCE</h3>
            <p className="text-sm text-slate-500">Official Payment Receipt</p>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Receipt No.</span>
              <span className="font-medium">
                {receipt?.receipt?.receiptNumber}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Amount</span>
              <span className="font-semibold text-green-600">
                {receipt?.receipt?.formattedAmount}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Method</span>
              <span>{receipt?.payment?.paymentMethod}</span>
            </div>

            <div className="flex justify-between">
              <span>Reference</span>
              <span>{receipt?.payment?.referenceNumber}</span>
            </div>

            <div className="flex justify-between">
              <span>Officer</span>
              <span>{receipt?.receipt?.processedBy}</span>
            </div>

            <div className="flex justify-between">
              <span>Date</span>
              <span>{receipt?.receipt?.paymentDate}</span>
            </div>
          </div>

          <Button
            onClick={() => window.print()}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            <Printer size={18} />
            Print Receipt
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
