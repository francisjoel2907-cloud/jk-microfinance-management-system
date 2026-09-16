export const DAILY_PENALTY = 2000;

export interface PenaltyCalculationResult {
  overdueDays: number;
  penaltyAmount: number;
}
