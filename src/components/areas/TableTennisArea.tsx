import React, { useState, useEffect } from 'react';
import { useGame } from '../../contexts/GameContext';
import { translations } from '../../data/translations';
import PoemCreator from '../PoemCreator';
import NPCDialogue from '../NPCDialogue';
import { Zap, Clock, User } from 'lucide-react';

interface TableTennisAreaProps {
  language: 'en' | 'zh';
}

const TableTennisArea: React.FC<TableTennisAreaProps> = ({ language }) => {
  const { gameState, addPoem, addClue, progressStory, interactWithNPC } = useGame();
  const [rhythm, setRhythm] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPoem, setShowPoem] = useState(false);
  const [showNPC, setShowNPC] = useState(false);
  const t = translations[language];

  const targetRhythm = [1, 2, 3, 2, 1]; // Fast-slow-fast pattern for unlocking poem
  const maxRhythm = 5;

  useEffect(() => {
    if (rhythm.length === targetRhythm.length) {
      if (JSON.stringify(rhythm) === JSON.stringify(targetRhythm)) {
        if (!gameState.unlockedPoems.includes('tabletennis-flow')) {
          addPoem('tabletennis-flow');
          addClue('rhythm-clue');
          progressStory();
          setShowPoem(true);
        }
      }
      setTimeout(() => setRhythm([]), 1500);
    }
  }, [rhythm, addPoem, addClue, gameState.unlockedPoems, progressStory]);

  const handleRacketHit = (intensity: number) => {
    if (rhythm.length < maxRhythm) {
      setRhythm(prev => [...prev, intensity]);
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 300);
    }
  };

  const handleNPCInteraction = () => {
    setShowNPC(true);
    if (!gameState.npcInteractions['pingpong-champion']) {
      interactWithNPC('pingpong-champion');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Zap className="w-10 h-10 text-orange-400" />
            {t.areas.tabletennis}
          </h2>
          <p className="text-orange-200 text-lg">
            {t.tabletennis.description}
          </p>
        </div>

        {/* Table Tennis Table */}
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-8 mb-6 border-4 border-white">
          <div className="bg-green-600 rounded-xl p-6 relative">
            {/* Net */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white transform -translate-x-1/2"></div>
            
            {/* Rhythm Indicators */}
            <div className="flex justify-center mb-6 space-x-2">
              {Array.from({ length: maxRhythm }).map((_, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 rounded-full border-2 ${
                    index < rhythm.length 
                      ? `bg-orange-${rhythm[index] * 200} border-orange-300` 
                      : 'border-gray-400'
                  } transition-all duration-300`}
                >
                  {index < rhythm.length && (
                    <span className="text-white text-xs flex items-center justify-center h-full">
                      {rhythm[index]}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Racket Controls */}
            <div className="flex justify-center space-x-4">
              {[1, 2, 3].map((intensity) => (
                <button
                  key={intensity}
                  onClick={() => handleRacketHit(intensity)}
                  className={`
                    px-6 py-4 rounded-lg font-semibold transition-all duration-300 transform
                    ${isPlaying ? 'scale-110 animate-pulse' : 'hover:scale-105'}
                    ${intensity === 1 
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                      : intensity === 2 
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                        : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                    }
                  `}
                >
                  <Clock className="w-5 h-5 mx-auto mb-1" />
                  {t.tabletennis.intensity[intensity - 1]}
                </button>
              ))}
            </div>
            
            <p className="text-center text-white mt-4">
              {t.tabletennis.hint}
            </p>
          </div>
        </div>

        {/* NPC Character */}
        <div className="text-center">
          <button
            onClick={handleNPCInteraction}
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
          >
            <User className="w-5 h-5" />
            {t.tabletennis.talkToChampion}
          </button>
        </div>

        {/* Poem Display */}
        {showPoem && (
          <PoemCreator
            poemId="tabletennis-flow"
            language={language}
            onClose={() => setShowPoem(false)}
            title={t.poems.tabletennisTitle}
            theme="flow"
          />
        )}

        {/* NPC Dialogue */}
        {showNPC && (
          <NPCDialogue
            npcId="pingpong-champion"
            language={language}
            onClose={() => setShowNPC(false)}
          />
        )}
      </div>
    </div>
  );
};

export default TableTennisArea;