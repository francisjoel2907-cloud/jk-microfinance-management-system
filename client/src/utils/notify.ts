import { toast } from "sonner";

// ==========================================
// Success
// ==========================================

const success = (message: string) => {
  toast.success(message);
};

// ==========================================
// Error
// ==========================================

const error = (message: string) => {
  toast.error(message);
};

// ==========================================
// Warning
// ==========================================

const warning = (message: string) => {
  toast.warning(message);
};

// ==========================================
// Info
// ==========================================

const info = (message: string) => {
  toast.info(message);
};

// ==========================================
// Export
// ==========================================

export const notify = {
  success,
  error,
  warning,
  info,
};
