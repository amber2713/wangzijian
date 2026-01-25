import React, { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { translations } from '../../data/translations';
import PoemCreator from '../PoemCreator';
import NPCDialogue from '../NPCDialogue';
import { Circle, Target, Sparkles } from 'lucide-react';

interface BilliardsRoomProps {
  language: 'en' | 'zh';
}

const BilliardsRoom: React.FC<BilliardsRoomProps> = ({ language }) => {
  const { gameState, addPoem, addClue, progressStory, interactWithNPC } = useGame();
  const [selectedBalls, setSelectedBalls] = useState<number[]>([]);
  const [showPoem, setShowPoem] = useState(false);
  const [showNPC, setShowNPC] = useState(false);
  const t = translations[language];

  const ballSequence = [3, 7, 1, 5]; // Strategic sequence for unlocking poem
  const balls = Array.from({ length: 8 }, (_, i) => i + 1);

  const handleBallClick = (ballNumber: number) => {
    const newSelected = [...selectedBalls, ballNumber];
    setSelectedBalls(newSelected);

    if (newSelected.length === ballSequence.length) {
      if (JSON.stringify(newSelected) === JSON.stringify(ballSequence)) {
        // Correct sequence - unlock poem
        if (!gameState.unlockedPoems.includes('billiards-strategy')) {
          addPoem('billiards-strategy');
          addClue('precision-clue');
          progressStory();
          setShowPoem(true);
        }
      } else {
        // Reset sequence
        setTimeout(() => setSelectedBalls([]), 1000);
      }
    }
  };

  const handleNPCInteraction = () => {
    setShowNPC(true);
    if (!gameState.npcInteractions['billiards-master']) {
      interactWithNPC('billiards-master');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Circle className="w-10 h-10 text-green-400" />
            {t.areas.billiards}
          </h2>
          <p className="text-green-200 text-lg">
            {t.billiards.description}
          </p>
        </div>

        {/* Billiards Table */}
        <div className="bg-green-800 rounded-2xl p-8 mb-6 border-4 border-amber-600">
          <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
            {balls.map((ballNumber) => {
              const isSelected = selectedBalls.includes(ballNumber);
              const selectionIndex = selectedBalls.indexOf(ballNumber);
              
              return (
                <button
                  key={ballNumber}
                  onClick={() => handleBallClick(ballNumber)}
                  className={`
                    w-16 h-16 rounded-full font-bold text-white transition-all duration-300 transform
                    ${isSelected 
                      ? 'scale-110 ring-4 ring-amber-400' 
                      : 'hover:scale-105 hover:shadow-lg'
                    }
                    ${ballNumber <= 8 
                      ? 'bg-gradient-to-br from-red-500 to-red-700' 
                      : 'bg-gradient-to-br from-blue-500 to-blue-700'
                    }
                  `}
                >
                  {ballNumber}
                  {isSelected && (
                    <span className="absolute -top-2 -right-2 bg-amber-400 text-black rounded-full w-6 h-6 text-xs flex items-center justify-center">
                      {selectionIndex + 1}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-green-200">
              {t.billiards.hint} ({selectedBalls.length}/4)
            </p>
            {selectedBalls.length > 0 && (
              <button
                onClick={() => setSelectedBalls([])}
                className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                {t.common.reset}
              </button>
            )}
          </div>
        </div>

        {/* NPC Character */}
        <div className="text-center">
          <button
            onClick={handleNPCInteraction}
            className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
          >
            <Target className="w-5 h-5" />
            {t.billiards.talkToMaster}
          </button>
        </div>

        {/* Poem Display */}
        {showPoem && (
          <PoemCreator
            poemId="billiards-strategy"
            language={language}
            onClose={() => setShowPoem(false)}
            title={t.poems.billiardsTitle}
            theme="strategy"
          />
        )}

        {/* NPC Dialogue */}
        {showNPC && (
          <NPCDialogue
            npcId="billiards-master"
            language={language}
            onClose={() => setShowNPC(false)}
          />
        )}
      </div>
    </div>
  );
};

export default BilliardsRoom;