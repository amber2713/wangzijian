import React, { useEffect } from 'react';
import { useGame } from '../context/GameContext';

export default function ProgressBar() {
  const { state } = useGame();

  useEffect(() => {
    // Check if game is complete
    if (state.gameProgress >= 100) {
      // Redirect to the specified URL
      window.location.href = 'https://ustc-art-teaching-ce-2dxa.bolt.host';
    }
  }, [state.gameProgress]);

  return (
    <div className="flex items-center gap-3">
      <span className={`text-sm text-white ${state.language === 'zh' ? 'chinese-text' : 'english-text'}`}>
        {state.language === 'zh' ? '进度' : 'Progress'}
      </span>
      <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-500 ease-out"
          style={{ width: `${state.gameProgress}%` }}
        />
      </div>
      <span className="text-sm text-white font-medium">
        {Math.round(state.gameProgress)}%
      </span>
    </div>
  );
}