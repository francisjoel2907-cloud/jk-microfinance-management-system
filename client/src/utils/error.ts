import axios from "axios";

/**
 * Safely extracts a readable error message from ANY error type
 */
export function getErrorMessage(error: unknown): string {
  // Axios errors (API/backend errors)
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Server error occurred"
    );
  }

  // Normal JS errors
  if (error instanceof Error) {
    return error.message;
  }

  // Unknown errors (fallback)
  return "Something went wrong. Please try again.";
}
