
import React from 'react';
import { Package, Car, Trash2 } from 'lucide-react';

interface Car {
  id: number;
  name: string;
  price: number;
  speed: number;
  durability: number;
  style: number;
  color: string;
}

interface PlayerInventoryProps {
  ownedCars: Car[];
  onSellCar: (car: Car) => void;
}

const PlayerInventory = ({ ownedCars, onSellCar }: PlayerInventoryProps) => {
  return (
    <div className="bg-gray-900/80 p-6 rounded-xl border border-cyan-400/30 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-6">
        <Package className="w-8 h-8 text-purple-400" />
        <h2 className="text-2xl font-bold text-white">My Garage</h2>
      </div>

      {ownedCars.length === 0 ? (
        <div className="text-center py-8">
          <Car className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Your garage is empty</p>
          <p className="text-gray-500">Visit the dealership to buy your first car!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ownedCars.map((car) => (
            <div key={car.id} className="bg-black/40 p-4 rounded-lg border border-gray-600">
              <div className="flex justify-between items-start mb-3">
                <h3 className={`text-xl font-bold ${car.color}`}>{car.name}</h3>
                <span className="text-gray-400 text-sm">Owned</span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Speed:</span>
                  <span className="text-yellow-400">{car.speed}/100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Durability:</span>
                  <span className="text-blue-400">{car.durability}/100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Style:</span>
                  <span className="text-purple-400">{car.style}/100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Value:</span>
                  <span className="text-green-400">${Math.floor(car.price * 0.7).toLocaleString()}</span>
                </div>
              </div>
              
              <button
                onClick={() => onSellCar(car)}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Sell for ${Math.floor(car.price * 0.7).toLocaleString()}</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayerInventory;
