
import React, { useState, useEffect } from 'react';
import GameHeader from '../components/GameHeader';
import CarDealership from '../components/CarDealership';
import MoneyTransfer from '../components/MoneyTransfer';
import JobCenter from '../components/JobCenter';
import PlayerInventory from '../components/PlayerInventory';
import { toast } from 'sonner';

interface Player {
  id: number;
  name: string;
  level: number;
  isOnline: boolean;
  money: number;
}

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

interface Job {
  id: number;
  title: string;
  description: string;
  reward: number;
  duration: number;
  difficulty: number;
  category: string;
}

const Index = () => {
  const [currentPlayer, setCurrentPlayer] = useState<Player>({
    id: 1,
    name: "Player_001",
    level: 1,
    isOnline: true,
    money: 10000
  });
  
  const [experience, setExperience] = useState(25);
  const [ownedCars, setOwnedCars] = useState<Car[]>([]);
  const [currentJob, setCurrentJob] = useState<Job | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [activeTab, setActiveTab] = useState('dealership');
  
  const [otherPlayers] = useState<Player[]>([
    { id: 2, name: "CityKing_92", level: 15, isOnline: true, money: 50000 },
    { id: 3, name: "StreetRacer", level: 8, isOnline: true, money: 25000 },
    { id: 4, name: "BusinessTycoon", level: 22, isOnline: false, money: 100000 },
  ]);

  // Job timer effect
  useEffect(() => {
    if (currentJob && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            completeJob();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentJob, timeRemaining]);

  const completeJob = () => {
    if (currentJob) {
      setCurrentPlayer(prev => ({ ...prev, money: prev.money + currentJob.reward }));
      setExperience(prev => prev + currentJob.difficulty * 10);
      toast.success(`Job completed! Earned $${currentJob.reward.toLocaleString()}`);
      setCurrentJob(null);
    }
  };

  const handleBuyCar = (car: Car) => {
    if (currentPlayer.money >= car.price && !ownedCars.some(owned => owned.id === car.id)) {
      setCurrentPlayer(prev => ({ ...prev, money: prev.money - car.price }));
      setOwnedCars(prev => [...prev, car]);
      setExperience(prev => prev + 15);
      toast.success(`Purchased ${car.name}!`);
    }
  };

  const handleSellCar = (car: Car) => {
    const sellPrice = Math.floor(car.price * 0.7);
    setCurrentPlayer(prev => ({ ...prev, money: prev.money + sellPrice }));
    setOwnedCars(prev => prev.filter(owned => owned.id !== car.id));
    toast.success(`Sold ${car.name} for $${sellPrice.toLocaleString()}!`);
  };

  const handleSendMoney = (playerId: number, amount: number) => {
    if (currentPlayer.money >= amount) {
      setCurrentPlayer(prev => ({ ...prev, money: prev.money - amount }));
      const recipient = otherPlayers.find(p => p.id === playerId);
      toast.success(`Sent $${amount.toLocaleString()} to ${recipient?.name}!`);
    }
  };

  const handleTakeJob = (job: Job) => {
    if (!currentJob) {
      setCurrentJob(job);
      setTimeRemaining(job.duration * 60); // Convert minutes to seconds
      toast.success(`Started job: ${job.title}`);
    }
  };

  const tabs = [
    { id: 'dealership', name: 'Car Dealership', icon: '🚗' },
    { id: 'garage', name: 'My Garage', icon: '🏠' },
    { id: 'jobs', name: 'Job Center', icon: '💼' },
    { id: 'transfer', name: 'Money Transfer', icon: '💸' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <style jsx global>{`
        .glow-text {
          text-shadow: 0 0 10px currentColor;
        }
        
        body {
          background: radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                      radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%);
        }
      `}</style>
      
      <GameHeader 
        playerName={currentPlayer.name}
        money={currentPlayer.money}
        level={currentPlayer.level}
        experience={experience}
      />
      
      <div className="container mx-auto p-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center mb-8 bg-black/20 p-2 rounded-xl border border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 mx-1 mb-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-400/25'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'dealership' && (
            <CarDealership 
              playerMoney={currentPlayer.money}
              onBuyCar={handleBuyCar}
              ownedCars={ownedCars}
            />
          )}
          
          {activeTab === 'garage' && (
            <PlayerInventory 
              ownedCars={ownedCars}
              onSellCar={handleSellCar}
            />
          )}
          
          {activeTab === 'jobs' && (
            <JobCenter 
              onTakeJob={handleTakeJob}
              currentJob={currentJob}
              timeRemaining={timeRemaining}
            />
          )}
          
          {activeTab === 'transfer' && (
            <MoneyTransfer 
              players={[currentPlayer, ...otherPlayers]}
              currentPlayerId={currentPlayer.id}
              playerMoney={currentPlayer.money}
              onSendMoney={handleSendMoney}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
