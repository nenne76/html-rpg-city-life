
import React from 'react';
import { ShoppingBag, Shirt, Watch, Diamond } from 'lucide-react';

interface ShopSystemProps {
  playerMoney: number;
  onPurchase: (item: string, cost: number) => void;
}

const ShopSystem = ({ playerMoney, onPurchase }: ShopSystemProps) => {
  const items = [
    {
      id: 1,
      name: "Designer Suit",
      price: 1500,
      icon: Shirt,
      description: "Luxury business attire",
      color: "text-purple-400"
    },
    {
      id: 2,
      name: "Gold Watch",
      price: 3000,
      icon: Watch,
      description: "Premium timepiece",
      color: "text-yellow-400"
    },
    {
      id: 3,
      name: "Diamond Ring",
      price: 8000,
      icon: Diamond,
      description: "Rare luxury jewelry",
      color: "text-cyan-400"
    }
  ];

  return (
    <div className="bg-gray-900/80 p-6 rounded-xl border border-cyan-400/30 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-6">
        <ShoppingBag className="w-8 h-8 text-green-400" />
        <h2 className="text-2xl font-bold text-white">Shopping Mall</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => {
          const Icon = item.icon;
          const canAfford = playerMoney >= item.price;
          
          return (
            <div key={item.id} className="bg-black/40 p-4 rounded-lg border border-gray-600 hover:border-cyan-400/50 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <Icon className={`w-6 h-6 ${item.color}`} />
                <h3 className={`text-lg font-bold ${item.color}`}>{item.name}</h3>
              </div>
              
              <p className="text-gray-300 text-sm mb-4">{item.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="text-green-400 font-bold">${item.price.toLocaleString()}</span>
                <button
                  onClick={() => onPurchase(item.name, item.price)}
                  disabled={!canAfford}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    canAfford
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white'
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {canAfford ? 'Buy Now' : 'Too Expensive'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShopSystem;
