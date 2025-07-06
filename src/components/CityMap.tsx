
import React from 'react';
import { MapPin, Building, Store, Car } from 'lucide-react';

interface CityMapProps {
  playerMoney: number;
  onPurchase: (item: string, cost: number) => void;
}

const CityMap = ({ playerMoney, onPurchase }: CityMapProps) => {
  const locations = [
    {
      id: 1,
      name: "Downtown Plaza",
      cost: 5000,
      icon: Building,
      description: "Premium city center location",
      color: "text-blue-400"
    },
    {
      id: 2,
      name: "Racing Track Access",
      cost: 2500,
      icon: Car,
      description: "Private racing track membership", 
      color: "text-red-400"
    },
    {
      id: 3,
      name: "VIP Club Membership",
      cost: 7500,
      icon: Store,
      description: "Exclusive nightclub access",
      color: "text-purple-400"
    }
  ];

  return (
    <div className="bg-gray-900/80 p-6 rounded-xl border border-cyan-400/30 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-6">
        <MapPin className="w-8 h-8 text-cyan-400" />
        <h2 className="text-2xl font-bold text-white">City Map</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {locations.map((location) => {
          const Icon = location.icon;
          const canAfford = playerMoney >= location.cost;
          
          return (
            <div key={location.id} className="bg-black/40 p-4 rounded-lg border border-gray-600 hover:border-cyan-400/50 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <Icon className={`w-6 h-6 ${location.color}`} />
                <h3 className={`text-lg font-bold ${location.color}`}>{location.name}</h3>
              </div>
              
              <p className="text-gray-300 text-sm mb-4">{location.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="text-green-400 font-bold">${location.cost.toLocaleString()}</span>
                <button
                  onClick={() => onPurchase(location.name, location.cost)}
                  disabled={!canAfford}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    canAfford
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white'
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {canAfford ? 'Purchase' : 'Too Expensive'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CityMap;
