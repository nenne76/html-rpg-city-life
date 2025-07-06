
import React, { useState } from 'react';
import { Send, DollarSign, Users } from 'lucide-react';

interface Player {
  id: number;
  name: string;
  level: number;
  isOnline: boolean;
}

interface MoneyTransferProps {
  players: Player[];
  currentPlayerId: number;
  playerMoney: number;
  onSendMoney: (playerId: number, amount: number) => void;
}

const MoneyTransfer = ({ players, currentPlayerId, playerMoney, onSendMoney }: MoneyTransferProps) => {
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const otherPlayers = players.filter(p => p.id !== currentPlayerId);

  const handleSendMoney = () => {
    if (!selectedPlayer || !amount || parseFloat(amount) <= 0) return;
    
    const transferAmount = parseFloat(amount);
    if (transferAmount > playerMoney) return;
    
    onSendMoney(selectedPlayer, transferAmount);
    setAmount('');
    setMessage(`Sent $${transferAmount.toLocaleString()} successfully!`);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="bg-gray-900/80 p-6 rounded-xl border border-cyan-400/30 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-6">
        <Send className="w-8 h-8 text-green-400" />
        <h2 className="text-2xl font-bold text-white">Money Transfer</h2>
      </div>

      {message && (
        <div className="bg-green-900/50 border border-green-400/50 p-3 rounded-lg mb-4">
          <p className="text-green-400 font-semibold">{message}</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2">Select Player</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
            {otherPlayers.map((player) => (
              <button
                key={player.id}
                onClick={() => setSelectedPlayer(player.id)}
                className={`p-3 rounded-lg border transition-all duration-300 text-left ${
                  selectedPlayer === player.id
                    ? 'bg-cyan-900/50 border-cyan-400 text-cyan-400'
                    : 'bg-black/40 border-gray-600 text-gray-300 hover:border-gray-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span className="font-semibold">{player.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">Lv.{player.level}</span>
                    <div className={`w-2 h-2 rounded-full ${player.isOnline ? 'bg-green-400' : 'bg-gray-500'}`} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Amount</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full bg-black/40 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors duration-300"
              max={playerMoney}
              min="1"
            />
          </div>
          <p className="text-gray-400 text-sm mt-1">Available: ${playerMoney.toLocaleString()}</p>
        </div>

        <button
          onClick={handleSendMoney}
          disabled={!selectedPlayer || !amount || parseFloat(amount) <= 0 || parseFloat(amount) > playerMoney}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-400/25"
        >
          Send Money
        </button>
      </div>
    </div>
  );
};

export default MoneyTransfer;
