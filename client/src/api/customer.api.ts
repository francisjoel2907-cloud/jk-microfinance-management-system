import api from "@/lib/api";

import type {
  CustomersResponse,
  CreateCustomerPayload,
} from "@/types/customer.types";

import type { CustomerStatementResponse } from "@/types/customerStatement.types";

export const getCustomers = async () => {
  const response = await api.get<CustomersResponse>("/customers");

  return response.data.data;
};

export const createCustomer = async (payload: CreateCustomerPayload) => {
  const response = await api.post("/customers", payload);

  return response.data.data;
};

export const updateCustomer = async (
  id: string,
  payload: CreateCustomerPayload,
) => {
  const response = await api.patch(`/customers/${id}`, payload);

  return response.data.data;
};

export const getCustomerStatement = async (customerId: string) => {
  const response = await api.get<CustomerStatementResponse>(
    `/customers/${customerId}/statement`,
  );

  return response.data.data;
};

export const getEligibleLoanCustomers = async () => {
  const response = await api.get<CustomersResponse>(
    "/customers/eligible-for-loan",
  );

  return response.data.data;
};
