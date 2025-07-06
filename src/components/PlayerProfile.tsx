
import React, { useState } from 'react';
import { User, Edit3, Star, Trophy } from 'lucide-react';

interface Player {
  id: number;
  name: string;
  level: number;
  isOnline: boolean;
  money: number;
}

interface PlayerProfileProps {
  player: Player;
  onChangeName: (newName: string) => void;
  experience: number;
}

const PlayerProfile = ({ player, onChangeName, experience }: PlayerProfileProps) => {
  const [newName, setNewName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      onChangeName(newName);
      setNewName('');
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-gray-900/80 p-6 rounded-xl border border-cyan-400/30 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-6">
        <User className="w-8 h-8 text-purple-400" />
        <h2 className="text-2xl font-bold text-white">Player Profile</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-black/40 p-4 rounded-lg border border-gray-600">
            <h3 className="text-lg font-semibold text-cyan-400 mb-3">Basic Information</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Current Name:</span>
                <span className="text-white font-bold">{player.name}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Level:</span>
                <span className="text-yellow-400 font-bold">{player.level}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Experience:</span>
                <span className="text-green-400">{experience}/100</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Status:</span>
                <span className="text-green-400">Online</span>
              </div>
            </div>
          </div>

          <div className="bg-black/40 p-4 rounded-lg border border-gray-600">
            <h3 className="text-lg font-semibold text-cyan-400 mb-3">Change Name</h3>
            <p className="text-gray-400 text-sm mb-3">Cost: $1,000</p>
            
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Edit3 className="w-4 h-4" />
                <span>Change Name</span>
              </button>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Enter new name"
                  className="w-full bg-black/40 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors duration-300"
                  maxLength={20}
                />
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    disabled={!newName.trim() || player.money < 1000}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
                  >
                    Confirm ($1,000)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setNewName('');
                    }}
                    className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-black/40 p-4 rounded-lg border border-gray-600">
            <h3 className="text-lg font-semibold text-cyan-400 mb-3">Achievements</h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-2 bg-yellow-900/30 rounded-lg border border-yellow-600/30">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <div>
                  <div className="text-yellow-400 font-semibold">First Steps</div>
                  <div className="text-gray-400 text-sm">Started your journey</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-2 bg-blue-900/30 rounded-lg border border-blue-600/30">
                <Star className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="text-blue-400 font-semibold">Money Maker</div>
                  <div className="text-gray-400 text-sm">Earned your first $10,000</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-2 bg-gray-700/50 rounded-lg border border-gray-600">
                <Trophy className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-gray-500 font-semibold">Car Collector</div>
                  <div className="text-gray-500 text-sm">Own 3 different cars</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
