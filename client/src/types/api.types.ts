// ==========================================
// Generic API Response
// ==========================================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}
