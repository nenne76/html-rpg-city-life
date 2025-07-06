
import React, { useState } from 'react';
import { Building2, TrendingUp, DollarSign } from 'lucide-react';

interface BankSystemProps {
  playerMoney: number;
  onTransaction: (amount: number) => void;
}

const BankSystem = ({ playerMoney, onTransaction }: BankSystemProps) => {
  const [loanAmount, setLoanAmount] = useState(1000);
  const [investAmount, setInvestAmount] = useState(1000);

  const handleLoan = () => {
    onTransaction(loanAmount);
  };

  const handleInvestment = () => {
    if (playerMoney >= investAmount) {
      const profit = Math.floor(investAmount * 0.35);
      onTransaction(-investAmount + profit);
    }
  };

  return (
    <div className="bg-gray-900/80 p-6 rounded-xl border border-cyan-400/30 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-6">
        <Building2 className="w-8 h-8 text-blue-400" />
        <h2 className="text-2xl font-bold text-white">City Bank</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Loan Section */}
        <div className="bg-black/40 p-4 rounded-lg border border-gray-600">
          <div className="flex items-center space-x-2 mb-4">
            <DollarSign className="w-5 h-5 text-green-400" />
            <h3 className="text-xl font-bold text-green-400">Quick Loan</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Loan Amount</label>
              <input
                type="range"
                min="5000"
                max="100000"
                step="5000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-center text-white font-bold mt-2">${loanAmount.toLocaleString()}</div>
            </div>
            
            <button
              onClick={handleLoan}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300"
            >
              Take Loan
            </button>
            
            <p className="text-gray-400 text-xs">Interest rate: 5% (already included)</p>
          </div>
        </div>

        {/* Investment Section */}
        <div className="bg-black/40 p-4 rounded-lg border border-gray-600">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <h3 className="text-xl font-bold text-blue-400">Investment</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Investment Amount</label>
              <input
                type="range"
                min="1000"
                max={Math.min(playerMoney, 100000)}
                step="1000"
                value={investAmount}
                onChange={(e) => setInvestAmount(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-center text-white font-bold mt-2">${investAmount.toLocaleString()}</div>
            </div>
            
            <button
              onClick={handleInvestment}
              disabled={playerMoney < investAmount}
              className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
                playerMoney >= investAmount
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              {playerMoney >= investAmount ? 'Invest Now' : 'Insufficient Funds'}
            </button>
            
            <p className="text-gray-400 text-xs">Expected return: 35% profit</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankSystem;
