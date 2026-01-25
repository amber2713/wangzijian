import React from 'react';
import { useGame } from '../context/GameContext';
import { Languages } from 'lucide-react';

export default function LanguageToggle() {
  const { state, dispatch } = useGame();

  return (
    <button
      onClick={() => dispatch({ type: 'TOGGLE_LANGUAGE' })}
      className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-all duration-200"
    >
      <Languages className="w-4 h-4" />
      <span className="text-sm font-medium">
        {state.language === 'zh' ? 'EN' : '中'}
      </span>
    </button>
  );
}