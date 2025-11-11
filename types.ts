
export interface SavingsCalculationResult {
  years: number;
  months: number;
  totalInterest: number;
  finalAmount: number;
  progressData: ProgressDataPoint[];
}

export interface ProgressDataPoint {
  year: number;
  endBalance: number;
  interestEarned: number;
  totalContributions: number;
}
