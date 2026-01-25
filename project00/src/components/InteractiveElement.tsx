import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Search, BookOpen, Key, Star } from 'lucide-react';

interface InteractiveElementProps {
  element: {
    id: string;
    name: { zh: string; en: string };
    description: { zh: string; en: string };
    type: 'search' | 'read' | 'puzzle' | 'poetry';
    reward?: string;
    discovered?: boolean;
  };
  onDiscovery: (discovery: string) => void;
}

export default function InteractiveElement({ element, onDiscovery }: InteractiveElementProps) {
  const { state, dispatch } = useGame();
  const [isInteracting, setIsInteracting] = useState(false);
  const [isDiscovered, setIsDiscovered] = useState(element.discovered || false);

  const getIcon = () => {
    switch (element.type) {
      case 'search': return Search;
      case 'read': return BookOpen;
      case 'puzzle': return Key;
      case 'poetry': return Star;
      default: return Search;
    }
  };

  const Icon = getIcon();

  const handleInteraction = () => {
    if (isDiscovered) return;
    
    setIsInteracting(true);
    
    setTimeout(() => {
      setIsDiscovered(true);
      if (element.reward) {
        dispatch({ type: 'ADD_TO_INVENTORY', item: element.reward });
      }
      onDiscovery(element.id);
      setIsInteracting(false);
    }, 2000);
  };

  return (
    <div className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
      isDiscovered 
        ? 'bg-green-900/30 border-green-400/30' 
        : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/30'
    }`}
    onClick={handleInteraction}
    >
      <div className="flex items-center gap-3 mb-3">
        <Icon className={`w-6 h-6 ${isDiscovered ? 'text-green-400' : 'text-blue-300'}`} />
        <h4 className={`font-semibold ${isDiscovered ? 'text-green-300' : 'text-white'} ${
          state.language === 'zh' ? 'chinese-text' : 'english-text'
        }`}>
          {state.language === 'zh' ? element.name.zh : element.name.en}
        </h4>
      </div>
      
      <p className={`text-sm leading-relaxed ${
        isDiscovered ? 'text-green-200' : 'text-blue-100'
      } ${state.language === 'zh' ? 'chinese-text' : 'english-text'}`}>
        {state.language === 'zh' ? element.description.zh : element.description.en}
      </p>

      {isInteracting && (
        <div className="mt-4 text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto"></div>
          <p className={`text-sm mt-2 text-blue-200 ${state.language === 'zh' ? 'chinese-text' : 'english-text'}`}>
            {state.language === 'zh' ? '探索中...' : 'Exploring...'}
          </p>
        </div>
      )}

      {isDiscovered && element.reward && (
        <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-400/30 rounded-lg">
          <p className={`text-sm text-yellow-200 ${state.language === 'zh' ? 'chinese-text' : 'english-text'}`}>
            {state.language === 'zh' ? '获得: ' : 'Found: '}{element.reward}
          </p>
        </div>
      )}
    </div>
  );
}