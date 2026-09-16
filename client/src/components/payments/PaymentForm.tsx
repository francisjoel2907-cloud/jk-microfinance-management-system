import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";

import { PAYMENT_METHODS } from "@/types/payment.types";
import { usePaymentForm } from "@/hooks/usePaymentForm";
import type { PaymentReceipt } from "@/types/paymentReceipt.types";

type PaymentFormProps = {
  loanId: string;

  onSuccess: (receipt: PaymentReceipt) => void;

  onCancel: () => void;
};

const PaymentForm = ({ loanId, onSuccess, onCancel }: PaymentFormProps) => {
  const { form, onSubmit, isLoading } = usePaymentForm(loanId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        const receipt = await onSubmit(values);

        onSuccess(receipt);
      })}
      className="space-y-5"
    >
      <fieldset disabled={isLoading} className="space-y-5">
        <Input
          label="Payment Amount"
          type="number"
          placeholder="Enter payment amount"
          error={errors.amount?.message}
          {...register("amount", {
            valueAsNumber: true,
          })}
        />

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Payment Method
          </label>

          <select
            {...register("paymentMethod")}
            className="
            w-full
            rounded-2xl
            border
            border-slate-300
            bg-slate-100
            px-4
            py-3
            outline-none
            focus:border-green-500
            focus:ring-2
            focus:ring-green-500
          "
          >
            <option value={PAYMENT_METHODS.CASH}>Cash</option>

            <option value={PAYMENT_METHODS.BANK_TRANSFER}>Bank Transfer</option>

            <option value={PAYMENT_METHODS.MOBILE_MONEY}>Mobile Money</option>
          </select>

          {errors.paymentMethod && (
            <p className="text-sm text-red-500">
              {errors.paymentMethod.message}
            </p>
          )}
        </div>

        <Input
          label="Payment Date"
          type="date"
          error={errors.paymentDate?.message}
          {...register("paymentDate")}
        />

        <Input
          label="Reference Number"
          placeholder="Optional"
          error={errors.referenceNumber?.message}
          {...register("referenceNumber")}
        />

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Notes</label>

          <textarea
            rows={4}
            {...register("notes")}
            className="
            w-full
            rounded-2xl
            border
            border-slate-300
            bg-slate-100
            px-4
            py-3
            outline-none
            focus:border-green-500
            focus:ring-2
            focus:ring-green-500
          "
            placeholder="Optional notes..."
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            loading={isLoading}
            className="bg-green-600 hover:bg-green-700"
          >
            Receive Payment
          </Button>
        </div>
      </fieldset>
    </form>
  );
};

export default PaymentForm;
