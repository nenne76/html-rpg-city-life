
import React from 'react';
import { Briefcase, Clock, DollarSign, Star } from 'lucide-react';

interface Job {
  id: number;
  title: string;
  description: string;
  reward: number;
  duration: number;
  difficulty: number;
  category: string;
}

interface JobCenterProps {
  onTakeJob: (job: Job) => void;
  currentJob: Job | null;
  timeRemaining: number;
}

const JobCenter = ({ onTakeJob, currentJob, timeRemaining }: JobCenterProps) => {
  const jobs: Job[] = [
    {
      id: 1,
      title: "Delivery Driver",
      description: "Deliver packages across the city",
      reward: 500,
      duration: 30,
      difficulty: 1,
      category: "Transport"
    },
    {
      id: 2,
      title: "Security Guard",
      description: "Protect a warehouse overnight",
      reward: 1200,
      duration: 60,
      difficulty: 2,
      category: "Security"
    },
    {
      id: 3,
      title: "Bank Heist",
      description: "High-risk, high-reward illegal job",
      reward: 5000,
      duration: 90,
      difficulty: 4,
      category: "Criminal"
    },
    {
      id: 4,
      title: "Corporate Executive",
      description: "Make important business decisions",
      reward: 2500,
      duration: 45,
      difficulty: 3,
      category: "Business"
    }
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Transport: 'text-blue-400',
      Security: 'text-green-400',
      Criminal: 'text-red-400',
      Business: 'text-purple-400'
    };
    return colors[category as keyof typeof colors] || 'text-gray-400';
  };

  return (
    <div className="bg-gray-900/80 p-6 rounded-xl border border-cyan-400/30 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-6">
        <Briefcase className="w-8 h-8 text-orange-400" />
        <h2 className="text-2xl font-bold text-white">Job Center</h2>
      </div>

      {currentJob && (
        <div className="bg-yellow-900/30 border border-yellow-400/50 p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-yellow-400 font-bold text-lg">{currentJob.title}</h3>
              <p className="text-gray-300">In progress...</p>
            </div>
            <div className="text-right">
              <div className="text-yellow-400 font-bold text-xl">{formatTime(timeRemaining)}</div>
              <div className="text-green-400 font-semibold">${currentJob.reward.toLocaleString()}</div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-black/40 p-4 rounded-lg border border-gray-600 hover:border-cyan-400/50 transition-all duration-300">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-white font-bold text-lg">{job.title}</h3>
                <span className={`text-sm font-semibold ${getCategoryColor(job.category)}`}>
                  {job.category}
                </span>
              </div>
              <div className="text-right">
                <div className="text-green-400 font-bold text-lg">${job.reward.toLocaleString()}</div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < job.difficulty ? 'text-red-400 fill-current' : 'text-gray-600'}`} />
                  ))}
                </div>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm mb-4">{job.description}</p>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-gray-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{job.duration} minutes</span>
              </div>
            </div>
            
            <button
              onClick={() => onTakeJob(job)}
              disabled={!!currentJob}
              className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
                currentJob
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white hover:shadow-lg hover:shadow-orange-400/25'
              }`}
            >
              {currentJob ? 'Job in Progress' : 'Take Job'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobCenter;
