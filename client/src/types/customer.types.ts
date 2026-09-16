export interface Customer {
  id: string;

  firstName: string;

  lastName: string;

  email: string | null;

  phone: string;

  address: string;

  nationalId: string;

  isActive: boolean;

  createdAt: string;

  updatedAt: string;
}

export interface CustomersResponse {
  success: boolean;
  message: string;
  data: Customer[];
}

export interface CreateCustomerPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  nationalId: string;
}
