
import React from 'react';
import { DollarSign, Car, Users, Briefcase } from 'lucide-react';

interface GameHeaderProps {
  playerName: string;
  money: number;
  level: number;
  experience: number;
}

const GameHeader = ({ playerName, money, level, experience }: GameHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 p-6 shadow-2xl border-b-2 border-cyan-400">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <h1 className="text-3xl font-bold text-cyan-400 glow-text">DalwarPG</h1>
          <div className="flex items-center space-x-2 bg-black/30 px-4 py-2 rounded-lg border border-cyan-400/30">
            <Users className="w-5 h-5 text-green-400" />
            <span className="text-white font-semibold">{playerName}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 bg-green-900/50 px-4 py-2 rounded-lg border border-green-400/50">
            <DollarSign className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-bold text-xl">${money.toLocaleString()}</span>
          </div>
          
          <div className="text-center">
            <div className="text-yellow-400 font-bold">Level {level}</div>
            <div className="w-24 bg-gray-700 rounded-full h-2 mt-1">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(experience % 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;
