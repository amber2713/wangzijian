import React from 'react';
import { useGame } from '../contexts/GameContext';
import { translations } from '../data/translations';
import { BookOpen, Key, MapPin } from 'lucide-react';

interface ProgressTrackerProps {
  language: 'en' | 'zh';
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ language }) => {
  const { gameState } = useGame();
  const t = translations[language];

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 min-w-64">
      <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
        <MapPin className="w-4 h-4" />
        {t.progress.title}
      </h3>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-blue-300">
          <BookOpen className="w-4 h-4" />
          <span>{t.progress.poems}: {gameState.unlockedPoems.length}/5</span>
        </div>
        
        <div className="flex items-center gap-2 text-amber-300">
          <Key className="w-4 h-4" />
          <span>{t.progress.clues}: {gameState.discoveredClues.length}/8</span>
        </div>
        
        <div className="mt-3 bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(gameState.storyProgress / 10) * 100}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-300">{t.progress.story}: {gameState.storyProgress}/10</p>
      </div>
    </div>
  );
};

export default ProgressTracker;