
import { SavingsCalculationResult, ProgressDataPoint } from '../types';

export const calculateSavingsGoal = (
  goalAmount: number,
  initialSavings: number,
  monthlyContribution: number,
  annualInterestRate: number
): SavingsCalculationResult => {
  if (goalAmount <= initialSavings) {
    return {
      years: 0,
      months: 0,
      totalInterest: 0,
      finalAmount: initialSavings,
      progressData: [{
        year: 0,
        endBalance: initialSavings,
        interestEarned: 0,
        totalContributions: initialSavings
      }],
    };
  }

  let currentBalance = initialSavings;
  let totalInterest = 0;
  let months = 0;
  const monthlyRate = annualInterestRate / 12 / 100;
  const progressData: ProgressDataPoint[] = [];

  let yearlyInterest = 0;
  let totalContributions = initialSavings;

  while (currentBalance < goalAmount) {
    const interestThisMonth = currentBalance * monthlyRate;
    totalInterest += interestThisMonth;
    yearlyInterest += interestThisMonth;
    currentBalance += monthlyContribution + interestThisMonth;
    totalContributions += monthlyContribution;
    months++;
    
    // Cap at 100 years to prevent infinite loops
    if (months > 1200) {
        break;
    }

    if (months % 12 === 0 || currentBalance >= goalAmount) {
      progressData.push({
        year: Math.ceil(months / 12),
        endBalance: Math.round(currentBalance),
        interestEarned: Math.round(yearlyInterest),
        totalContributions: Math.round(totalContributions),
      });
      yearlyInterest = 0;
    }
  }

  return {
    years: Math.floor(months / 12),
    months: months % 12,
    totalInterest: Math.round(totalInterest),
    finalAmount: Math.round(currentBalance),
    progressData,
  };
};
