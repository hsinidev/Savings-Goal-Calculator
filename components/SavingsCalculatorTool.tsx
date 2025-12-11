import React, { useState } from 'react';
import { calculateSavingsGoal } from '../utils/FinancialMath';
import { SavingsCalculationResult } from '../types';

// A simple SVG icon for the button
const CalculateIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-6m-3 3h.01M12 21a9 9 0 110-18 9 9 0 010 18z" />
    </svg>
);

const SavingsCalculatorTool: React.FC = () => {
    const [goalAmount, setGoalAmount] = useState('10000');
    const [initialSavings, setInitialSavings] = useState('1000');
    const [monthlyContribution, setMonthlyContribution] = useState('200');
    const [annualInterestRate, setAnnualInterestRate] = useState('5');
    const [result, setResult] = useState<SavingsCalculationResult | null>(null);
    const [error, setError] = useState<string>('');

    const handleCalculate = () => {
        const goal = parseFloat(goalAmount);
        const initial = parseFloat(initialSavings);
        const monthly = parseFloat(monthlyContribution);
        const rate = parseFloat(annualInterestRate);

        if (isNaN(goal) || isNaN(initial) || isNaN(monthly) || isNaN(rate)) {
            setError('Please enter valid numbers in all fields.');
            setResult(null);
            return;
        }

        if (goal <= initial) {
            setError('Goal amount must be greater than initial savings.');
            setResult(null);
            return;
        }
        
        if (monthly <= 0 && rate <= 0) {
             setError('With no monthly contributions or interest, you will never reach your goal.');
             setResult(null);
             return;
        }

        setError('');
        const calculation = calculateSavingsGoal(goal, initial, monthly, rate);
        setResult(calculation);
    };

    return (
        <section aria-labelledby="calculator-title" className="max-w-4xl mx-auto p-6 sm:p-8 bg-gray-900 bg-opacity-50 rounded-2xl shadow-2xl backdrop-blur-lg border border-gray-700">
            <div className="text-center mb-8">
                <h2 id="calculator-title" className="text-3xl md:text-4xl font-bold text-white">Chart Your Path to Financial Freedom</h2>
                <p className="text-gray-300 mt-2 max-w-2xl mx-auto">Enter your details below to see how long it will take to reach your savings goal.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <InputField label="Goal Amount ($)" value={goalAmount} onChange={setGoalAmount} placeholder="e.g., 10000" />
                <InputField label="Initial Savings ($)" value={initialSavings} onChange={setInitialSavings} placeholder="e.g., 1000" />
                <InputField label="Monthly Contribution ($)" value={monthlyContribution} onChange={setMonthlyContribution} placeholder="e.g., 200" />
                <InputField label="Annual Interest Rate (%)" value={annualInterestRate} onChange={setAnnualInterestRate} placeholder="e.g., 5" />
            </div>
            
            <div className="text-center">
                <button onClick={handleCalculate} className="inline-flex items-center justify-center w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-12 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                    <CalculateIcon />
                    Calculate
                </button>
            </div>

            {error && <div className="mt-6 text-center text-red-400 p-3 bg-red-900 bg-opacity-30 rounded-lg">{error}</div>}

            {result && (
                <div className="mt-10 animate-fade-in">
                    <div className="text-center p-8 bg-gray-800 bg-opacity-40 rounded-xl border border-gray-600">
                        <h3 className="text-lg text-gray-300 font-medium">Time to Reach Your Goal</h3>
                        <p className="text-4xl md:text-5xl font-bold text-green-400 my-2">
                            {result.years > 0 && `${result.years} Year${result.years !== 1 ? 's' : ''}`}
                            {result.years > 0 && result.months > 0 && <span className="text-gray-400 mx-2">and</span>}
                            {result.months > 0 && `${result.months} Month${result.months !== 1 ? 's' : ''}`}
                            {result.years === 0 && result.months === 0 && 'Goal Already Reached!'}
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 mt-6 text-lg">
                           <div className="flex items-center gap-2">
                               <span className="text-green-400" role="img" aria-label="chart increasing">📈</span>
                               <p className="text-gray-400">Interest Earned: <span className="font-semibold text-white">${result.totalInterest.toLocaleString()}</span></p>
                           </div>
                           <div className="flex items-center gap-2">
                                <span className="text-blue-400" role="img" aria-label="money bag">💰</span>
                                <p className="text-gray-400">Final Amount: <span className="font-semibold text-white">${result.finalAmount.toLocaleString()}</span></p>
                           </div>
                        </div>
                    </div>

                    <div className="mt-8">
                         <h4 className="text-2xl font-bold text-center mb-4">Projected Growth</h4>
                        <div className="overflow-x-auto">
                           <table className="w-full text-left bg-gray-800 bg-opacity-50 rounded-lg">
                                <thead>
                                    <tr className="border-b border-gray-600">
                                        <th className="p-4">Year</th>
                                        <th className="p-4">Total Contributions</th>
                                        <th className="p-4">Interest Earned</th>
                                        <th className="p-4">End of Year Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.progressData.map((data, index) => (
                                        <tr key={index} className="border-b border-gray-700 last:border-b-0 hover:bg-gray-700/50 transition-colors">
                                            <td className="p-4 font-semibold">{data.year}</td>
                                            <td className="p-4">${data.totalContributions.toLocaleString()}</td>
                                            <td className="p-4 text-green-400">${data.interestEarned.toLocaleString()}</td>
                                            <td className="p-4 font-bold text-white">${data.endBalance.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

interface InputFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, placeholder }) => (
    <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
        <input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-gray-800 border border-gray-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow duration-300"
            aria-label={label}
        />
    </div>
);


export default SavingsCalculatorTool;
