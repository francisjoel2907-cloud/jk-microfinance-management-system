import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";

import { useCustomerForm } from "@/hooks/useCustomerForm";

import type { Customer } from "@/types/customer.types";

type CustomerFormProps = {
  customer?: Customer;

  onCancel: () => void;

  onSuccess: () => void;
};

const CustomerForm = ({ customer, onCancel, onSuccess }: CustomerFormProps) => {
  const { form, onSubmit, isLoading } = useCustomerForm(customer);

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
      <Input
        label="First Name"
        placeholder="Enter first name"
        error={errors.firstName?.message}
        {...register("firstName")}
      />

      <Input
        label="Last Name"
        placeholder="Enter last name"
        error={errors.lastName?.message}
        {...register("lastName")}
      />

      <Input
        type="email"
        label="Email Address"
        placeholder="example@gmail.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Phone Number"
        placeholder="2557XXXXXXXX"
        error={errors.phone?.message}
        {...register("phone")}
      />

      <Input
        label="Address"
        placeholder="Customer address"
        error={errors.address?.message}
        {...register("address")}
      />

      <Input
        label="National ID"
        placeholder="National ID"
        error={errors.nationalId?.message}
        {...register("nationalId")}
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
          {customer ? "Update Customer" : "Create Customer"}
        </Button>
      </div>
    </form>
  );
};

export default CustomerForm;
