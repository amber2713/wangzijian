import React from 'react';
import { Sparkles, Clock, Brain, Eye, Zap } from 'lucide-react';

interface MagicalFoodProps {
  name: string;
  description: string;
  effect: string;
  onConsume: () => void;
  available: boolean;
}

const MagicalFood: React.FC<MagicalFoodProps> = ({
  name,
  description,
  effect,
  onConsume,
  available
}) => {
  const getIcon = () => {
    if (name.includes('Memory')) return <Brain className="w-6 h-6" />;
    if (name.includes('Time')) return <Clock className="w-6 h-6" />;
    if (name.includes('Quantum')) return <Zap className="w-6 h-6" />;
    if (name.includes('Reality')) return <Eye className="w-6 h-6" />;
    return <Sparkles className="w-6 h-6" />;
  };

  const getGlowColor = () => {
    if (name.includes('Memory')) return 'shadow-blue-500/50';
    if (name.includes('Time')) return 'shadow-green-500/50';
    if (name.includes('Quantum')) return 'shadow-purple-500/50';
    if (name.includes('Reality')) return 'shadow-yellow-500/50';
    return 'shadow-pink-500/50';
  };

  return (
    <div className={`bg-slate-800/80 rounded-lg p-4 border border-purple-500/30 ${available ? 'hover-lift cursor-pointer' : 'opacity-50'}`}>
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-full bg-purple-900/50 ${available ? `glow ${getGlowColor()}` : ''}`}>
          {getIcon()}
        </div>
        <div>
          <h4 className="text-white font-semibold">{name}</h4>
          <p className="text-purple-300 text-sm">{description}</p>
        </div>
      </div>
      
      <p className="text-purple-200 text-sm mb-3 italic">Effect: {effect}</p>
      
      {available ? (
        <button
          onClick={onConsume}
          className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg text-white font-medium transition-all duration-300"
        >
          Consume
        </button>
      ) : (
        <div className="w-full py-2 bg-slate-700 rounded-lg text-slate-400 text-center">
          Not Available
        </div>
      )}
    </div>
  );
};

export default MagicalFood;