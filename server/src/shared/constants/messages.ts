const MESSAGES = {
  COMMON: {
    SUCCESS: "Request completed successfully",

    INTERNAL_SERVER_ERROR: "Internal server error",

    NOT_FOUND: "Resource not found",

    UNAUTHORIZED: "Unauthorized access",

    FORBIDDEN: "Access forbidden",

    VALIDATION_ERROR: "Validation error",
  },

  AUTH: {
    LOGIN_SUCCESS: "Login successful",

    INVALID_CREDENTIALS: "Invalid email or password",

    TOKEN_REQUIRED: "Authentication token required",

    TOKEN_INVALID: "Invalid or expired token",

    USER_ALREADY_EXISTS: "User already exists",
    USER_NOT_FOUND: "User not found",
  },

  USER: {
    CREATED: "User created successfully",

    UPDATED: "User updated successfully",

    DELETED: "User deleted successfully",

    NOT_FOUND: "User not found",
  },

  CUSTOMER: {
    CREATED: "Customer created successfully",

    UPDATED: "Customer updated successfully",

    DELETED: "Customer deleted successfully",

    NOT_FOUND: "Customer not found",

    PHONE_EXISTS: "Phone number already exists",

    EMAIL_EXISTS: "Email already exists",

    NATIONAL_ID_EXISTS: "National ID already exists",
  },

  LOAN: {
    CREATED: "Loan created successfully",

    UPDATED: "Loan updated successfully",

    NOT_FOUND: "Loan not found",

    ACTIVE_LOAN_EXISTS: "Customer already has an active loan",
  },
} as const;

export default MESSAGES;
