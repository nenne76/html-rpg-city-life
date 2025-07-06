
import React from 'react';
import { Home, Building, Factory, Store } from 'lucide-react';

interface PropertyMarketProps {
  playerMoney: number;
  onPurchase: (item: string, cost: number) => void;
}

const PropertyMarket = ({ playerMoney, onPurchase }: PropertyMarketProps) => {
  const properties = [
    {
      id: 1,
      name: "Small Apartment",
      price: 25000,
      income: 500,
      icon: Home,
      description: "A cozy starter apartment in downtown",
      color: "text-blue-400"
    },
    {
      id: 2,
      name: "Luxury Condo",
      price: 75000,
      income: 1500,
      icon: Building,
      description: "High-end condominium with city views",
      color: "text-purple-400"
    },
    {
      id: 3,
      name: "Shopping Mall",
      price: 200000,
      income: 5000,
      icon: Store,
      description: "Large commercial property with multiple stores",
      color: "text-green-400"
    },
    {
      id: 4,
      name: "Industrial Complex",
      price: 500000,
      income: 12000,
      icon: Factory,
      description: "Manufacturing facility with high returns",
      color: "text-red-400"
    }
  ];

  return (
    <div className="bg-gray-900/80 p-6 rounded-xl border border-cyan-400/30 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-6">
        <Building className="w-8 h-8 text-green-400" />
        <h2 className="text-2xl font-bold text-white">Real Estate Market</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {properties.map((property) => {
          const Icon = property.icon;
          const canAfford = playerMoney >= property.price;
          
          return (
            <div key={property.id} className="bg-black/40 p-4 rounded-lg border border-gray-600 hover:border-cyan-400/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Icon className={`w-6 h-6 ${property.color}`} />
                  <h3 className={`text-xl font-bold ${property.color}`}>{property.name}</h3>
                </div>
                <span className="text-green-400 font-bold text-lg">${property.price.toLocaleString()}</span>
              </div>
              
              <p className="text-gray-300 text-sm mb-4">{property.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Monthly Income:</span>
                  <span className="text-green-400 font-semibold">+${property.income.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">ROI per month:</span>
                  <span className="text-yellow-400 font-semibold">{((property.income / property.price) * 100).toFixed(1)}%</span>
                </div>
              </div>
              
              <button
                onClick={() => onPurchase(property.name, property.price)}
                disabled={!canAfford}
                className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  canAfford
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white hover:shadow-lg hover:shadow-green-400/25'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
              >
                {canAfford ? 'Purchase Property' : 'Not Enough Money'}
              </button>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 bg-black/40 p-4 rounded-lg border border-gray-600">
        <h3 className="text-lg font-semibold text-cyan-400 mb-2">Investment Tips</h3>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• Properties generate passive income every hour</li>
          <li>• Higher-priced properties have better returns</li>
          <li>• Diversify your portfolio for maximum profit</li>
          <li>• Property values may appreciate over time</li>
        </ul>
      </div>
    </div>
  );
};

export default PropertyMarket;
