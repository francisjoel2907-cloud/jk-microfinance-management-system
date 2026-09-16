import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";

import { useEligibleLoanCustomers } from "@/hooks/useEligibleLoanCustomers";
import { useLoanForm } from "@/hooks/useLoanForm";

type CreateLoanFormProps = {
  onSuccess: () => void;
  onCancel: () => void;
};

const CreateLoanForm = ({ onSuccess, onCancel }: CreateLoanFormProps) => {
  const { data: customers = [] } = useEligibleLoanCustomers();

  const { form, onSubmit, isLoading } = useLoanForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        await onSubmit(values);

        onSuccess();
      })}
      className="space-y-5"
    >
      {/* Customer */}

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Customer</label>

        <select
          {...register("customerId")}
          className="w-full rounded-2xl border border-slate-300 bg-slate-100 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select customer</option>

          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.firstName} {customer.lastName}
            </option>
          ))}
        </select>

        {errors.customerId && (
          <p className="text-sm text-red-500">{errors.customerId.message}</p>
        )}
      </div>

      <Input
        label="Principal Amount"
        type="number"
        placeholder="100000"
        error={errors.principalAmount?.message}
        {...register("principalAmount", { valueAsNumber: true })}
      />

      <Input
        label="Interest Rate (%)"
        type="number"
        placeholder="10"
        error={errors.interestRate?.message}
        {...register("interestRate", { valueAsNumber: true })}
      />

      <Input
        label="Duration (Months)"
        type="number"
        placeholder="6"
        error={errors.durationMonths?.message}
        {...register("durationMonths", { valueAsNumber: true })}
      />

      <Input
        label="Issue Date"
        type="date"
        error={errors.issuedDate?.message}
        {...register("issuedDate")}
      />

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        <Button
          type="submit"
          loading={isLoading}
          className="bg-green-600 hover:bg-green-700"
        >
          Create Loan
        </Button>
      </div>
    </form>
  );
};

export default CreateLoanForm;
