import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Sparkles, ArrowRight } from 'lucide-react';
import { useGame } from '../contexts/GameContext';

const StartScreen: React.FC = () => {
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();
  const { dispatch } = useGame();

  const handleStart = () => {
    if (playerName.trim()) {
      dispatch({ type: 'SET_PLAYER_NAME', payload: playerName.trim() });
      navigate('/cafeteria');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center fade-in">
        <div className="mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="w-12 h-12 text-purple-400" />
            <Sparkles className="w-8 h-8 text-pink-400 animate-pulse" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            The USTC Cafeteria
          </h1>
          <h2 className="text-2xl magical-text mb-6">
            Where Reality Meets the Extraordinary
          </h2>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-purple-500/30 mb-8">
          <p className="text-purple-200 text-lg leading-relaxed mb-6">
            Welcome to the University of Science and Technology of China. As a new student, 
            you're about to discover that the cafeteria holds secrets far beyond ordinary meals. 
            Strange whispers speak of magical dishes, hidden passages, and mysteries that blur 
            the line between science and sorcery.
          </p>
          
          <p className="text-white font-semibold mb-4">
            Your journey begins now. What is your name?
          </p>
          
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name..."
              className="flex-1 px-4 py-3 bg-slate-700 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition-colors"
              onKeyPress={(e) => e.key === 'Enter' && handleStart()}
            />
            <button
              onClick={handleStart}
              disabled={!playerName.trim()}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-600 disabled:to-gray-600 rounded-lg text-white font-medium transition-all duration-300 flex items-center gap-2 disabled:cursor-not-allowed"
            >
              Begin
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="text-purple-300 text-sm">
          <p className="mb-2">🎭 Immersive storytelling with meaningful choices</p>
          <p className="mb-2">🔮 Magical realism meets university life</p>
          <p>🗝️ Uncover secrets hidden in plain sight</p>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;