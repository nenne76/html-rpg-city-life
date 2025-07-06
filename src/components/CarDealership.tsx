
import React from 'react';
import { Car, Zap, Shield, Gauge } from 'lucide-react';

interface Car {
  id: number;
  name: string;
  price: number;
  speed: number;
  durability: number;
  style: number;
  color: string;
  description: string;
}

interface CarDealershipProps {
  playerMoney: number;
  onBuyCar: (car: Car) => void;
  ownedCars: Car[];
}

const CarDealership = ({ playerMoney, onBuyCar, ownedCars }: CarDealershipProps) => {
  const cars: Car[] = [
    {
      id: 1,
      name: "Street Cruiser",
      price: 15000,
      speed: 60,
      durability: 70,
      style: 50,
      color: "text-blue-400",
      description: "Perfect for city cruising and daily commutes"
    },
    {
      id: 2,
      name: "Speed Demon",
      price: 45000,
      speed: 95,
      durability: 60,
      style: 80,
      color: "text-red-400",
      description: "High-performance sports car for racing enthusiasts"
    },
    {
      id: 3,
      name: "Luxury Elite",
      price: 80000,
      speed: 75,
      durability: 90,
      style: 95,
      color: "text-yellow-400",
      description: "Ultimate luxury vehicle with premium features"
    },
    {
      id: 4,
      name: "Urban Tank",
      price: 120000,
      speed: 50,
      durability: 100,
      style: 70,
      color: "text-gray-400",
      description: "Heavily armored vehicle for dangerous missions"
    }
  ];

  const canAfford = (price: number) => playerMoney >= price;
  const alreadyOwned = (carId: number) => ownedCars.some(car => car.id === carId);

  return (
    <div className="bg-gray-900/80 p-6 rounded-xl border border-cyan-400/30 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-6">
        <Car className="w-8 h-8 text-cyan-400" />
        <h2 className="text-2xl font-bold text-white">Car Dealership</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cars.map((car) => (
          <div key={car.id} className="bg-black/40 p-4 rounded-lg border border-gray-600 hover:border-cyan-400/50 transition-all duration-300">
            <div className="flex justify-between items-start mb-3">
              <h3 className={`text-xl font-bold ${car.color}`}>{car.name}</h3>
              <span className="text-green-400 font-bold text-lg">${car.price.toLocaleString()}</span>
            </div>
            
            <p className="text-gray-300 text-sm mb-4">{car.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-gray-300">Speed</span>
                </div>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i < car.speed / 20 ? 'bg-yellow-400' : 'bg-gray-600'}`} />
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-300">Durability</span>
                </div>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i < car.durability / 20 ? 'bg-blue-400' : 'bg-gray-600'}`} />
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Gauge className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-300">Style</span>
                </div>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i < car.style / 20 ? 'bg-purple-400' : 'bg-gray-600'}`} />
                  ))}
                </div>
              </div>
            </div>
            
            <button
              onClick={() => onBuyCar(car)}
              disabled={!canAfford(car.price) || alreadyOwned(car.id)}
              className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
                alreadyOwned(car.id) 
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                  : canAfford(car.price)
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white hover:shadow-lg hover:shadow-cyan-400/25'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              {alreadyOwned(car.id) ? 'Owned' : canAfford(car.price) ? 'Buy Now' : 'Not Enough Money'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarDealership;
