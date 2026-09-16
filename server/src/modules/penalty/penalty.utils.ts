import { DAILY_PENALTY, PenaltyCalculationResult } from "./penalty.types";

export const calculatePenalty = (dueDate: Date): PenaltyCalculationResult => {
  const today = new Date();

  // Remove time portion
  today.setHours(0, 0, 0, 0);

  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  const difference = today.getTime() - due.getTime();

  const overdueDays = Math.max(
    0,
    Math.floor(difference / (1000 * 60 * 60 * 24)),
  );

  return {
    overdueDays,

    penaltyAmount: overdueDays * DAILY_PENALTY,
  };
};
