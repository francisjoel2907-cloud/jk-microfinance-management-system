import api from "@/lib/api";

import type {
  LoanResponse,
  LoanDetails,
  CreateLoanPayload,
} from "@/types/loan.types";

/**
 * Get all loans
 */
export const getLoans = async (): Promise<LoanResponse> => {
  const response = await api.get<{
    success: boolean;
    message: string;
    data: LoanResponse;
  }>("/loans");

  return response.data.data;
};

export const createLoan = async (payload: CreateLoanPayload) => {
  const response = await api.post("/loans", payload);

  return response.data.data;
};

export const getLoanById = async (loanId: string): Promise<LoanDetails> => {
  const response = await api.get<{
    success: boolean;
    message: string;
    data: LoanDetails;
  }>(`/loans/${loanId}`);

  return response.data.data;
};
