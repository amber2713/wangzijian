import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { characters } from '../data/characters';
import { MessageCircle, Heart } from 'lucide-react';

interface CharacterInteractionProps {
  characterId: string;
}

export default function CharacterInteraction({ characterId }: CharacterInteractionProps) {
  const { state, dispatch } = useGame();
  const [isConversing, setIsConversing] = useState(false);
  const character = characters[characterId];
  const characterState = state.characters[characterId];

  if (!character) return null;

  const handleConversation = () => {
    if (!characterState.met) {
      dispatch({ type: 'MEET_CHARACTER', character: characterId });
    }
    
    setIsConversing(true);
    
    setTimeout(() => {
      dispatch({ type: 'INCREASE_FRIENDSHIP', character: characterId, amount: 10 });
      setIsConversing(false);
    }, 1500);
  };

  return (
    <div className="p-6 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300">
      <div className="flex items-center gap-3 mb-3">
        <MessageCircle className="w-5 h-5 text-purple-300" />
        <h4 className={`font-semibold text-white ${state.language === 'zh' ? 'chinese-text' : 'english-text'}`}>
          {state.language === 'zh' ? character.name.zh : character.name.en}
        </h4>
        {characterState.met && (
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4 text-red-400" />
            <span className="text-xs text-red-300">{characterState.friendship}</span>
          </div>
        )}
      </div>

      <p className={`text-sm text-blue-100 mb-4 leading-relaxed ${state.language === 'zh' ? 'chinese-text' : 'english-text'}`}>
        {state.language === 'zh' ? character.description.zh : character.description.en}
      </p>

      <button
        onClick={handleConversation}
        disabled={isConversing}
        className={`w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white rounded-lg transition-colors duration-200 ${
          state.language === 'zh' ? 'chinese-text' : 'english-text'
        }`}
      >
        {isConversing 
          ? (state.language === 'zh' ? '对话中...' : 'Conversing...')
          : (state.language === 'zh' ? '对话' : 'Talk')
        }
      </button>

      {isConversing && (
        <div className="mt-4 p-3 bg-purple-900/30 border border-purple-400/30 rounded-lg">
          <p className={`text-sm text-purple-200 italic ${state.language === 'zh' ? 'chinese-text' : 'english-text'}`}>
            {state.language === 'zh' 
              ? character.dialogue.zh[Math.floor(Math.random() * character.dialogue.zh.length)]
              : character.dialogue.en[Math.floor(Math.random() * character.dialogue.en.length)]
            }
          </p>
        </div>
      )}
    </div>
  );
}