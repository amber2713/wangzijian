import React, { useState, useEffect } from 'react';
import { useGame } from '../../contexts/GameContext';
import { translations } from '../../data/translations';
import PoemCreator from '../PoemCreator';
import NPCDialogue from '../NPCDialogue';
import { Target, Music, User, Heart } from 'lucide-react';

interface BoxingRoomProps {
  language: 'en' | 'zh';
}

const BoxingRoom: React.FC<BoxingRoomProps> = ({ language }) => {
  const { gameState, addPoem, addClue, progressStory, interactWithNPC, updateGameState } = useGame();
  const [rhythm, setRhythm] = useState<number[]>([]);
  const [showPoem, setShowPoem] = useState(false);
  const [showNPC, setShowNPC] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const t = translations[language];

  const rhythmPattern = [1, 2, 2, 3, 3, 3]; // Boxing rhythm for unlocking poem
  const beats = [
    { id: 1, name: t.boxing.beats.light, color: 'from-green-500 to-green-600' },
    { id: 2, name: t.boxing.beats.medium, color: 'from-yellow-500 to-yellow-600' },
    { id: 3, name: t.boxing.beats.heavy, color: 'from-red-500 to-red-600' }
  ];

  useEffect(() => {
    if (rhythm.length === rhythmPattern.length) {
      if (JSON.stringify(rhythm) === JSON.stringify(rhythmPattern)) {
        if (!gameState.unlockedPoems.includes('boxing-rhythm')) {
          addPoem('boxing-rhythm');
          addClue('heart-clue');
          progressStory();
          setShowPoem(true);
          
          // Check if this is the final area needed for escape
          if (gameState.unlockedPoems.length >= 4) {
            updateGameState({ hasEscapeKey: true });
          }
        }
      }
      setTimeout(() => setRhythm([]), 2000);
    }
  }, [rhythm, addPoem, addClue, gameState.unlockedPoems, progressStory, updateGameState]);

  const handlePunch = (beatType: number) => {
    if (rhythm.length < rhythmPattern.length) {
      setRhythm(prev => [...prev, beatType]);
      setIsTraining(true);
      setTimeout(() => setIsTraining(false), 300);
    }
  };

  const handleNPCInteraction = () => {
    setShowNPC(true);
    if (!gameState.npcInteractions['boxing-master']) {
      interactWithNPC('boxing-master');
    }
  };

  const handleEscape = () => {
    if (gameState.hasEscapeKey) {
      window.location.href = 'https://blank-duplicated-s634.bolt.host';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Target className="w-10 h-10 text-yellow-400" />
            {t.areas.boxing}
          </h2>
          <p className="text-yellow-200 text-lg">
            {t.boxing.description}
          </p>
        </div>

        {/* Boxing Ring */}
        <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-2xl p-8 mb-6 border-4 border-yellow-500 relative">
          {/* Ring Ropes */}
          <div className="absolute inset-4 border-4 border-white rounded-lg">
            <div className="absolute inset-2 border-2 border-white rounded-lg">
              <div className="absolute inset-2 border border-white rounded-lg"></div>
            </div>
          </div>

          {/* Punching Bag */}
          <div className="relative z-10 text-center">
            <div className={`
              w-32 h-48 bg-gradient-to-b from-amber-700 to-amber-900 rounded-full mx-auto mb-6 
              flex items-center justify-center transition-all duration-300 transform
              ${isTraining ? 'animate-pulse scale-110' : ''}
            `}>
              <Heart className="w-12 h-12 text-yellow-300" />
            </div>

            {/* Rhythm Display */}
            <div className="mb-6">
              <div className="flex justify-center space-x-2 mb-4">
                {rhythm.map((beat, index) => (
                  <div
                    key={index}
                    className={`
                      w-6 h-6 rounded-full 
                      ${beat === 1 ? 'bg-green-400' : beat === 2 ? 'bg-yellow-400' : 'bg-red-400'}
                    `}
                  ></div>
                ))}
                {Array.from({ length: rhythmPattern.length - rhythm.length }).map((_, index) => (
                  <div
                    key={`empty-${index}`}
                    className="w-6 h-6 rounded-full border-2 border-gray-500"
                  ></div>
                ))}
              </div>
              <p className="text-yellow-200">{t.boxing.hint}</p>
            </div>

            {/* Beat Controls */}
            <div className="flex justify-center space-x-4">
              {beats.map((beat) => (
                <button
                  key={beat.id}
                  onClick={() => handlePunch(beat.id)}
                  className={`
                    px-6 py-4 bg-gradient-to-r ${beat.color} text-white rounded-lg font-semibold
                    transition-all duration-300 transform hover:scale-105
                    ${isTraining ? 'animate-pulse' : ''}
                  `}
                >
                  <Music className="w-5 h-5 mx-auto mb-1" />
                  {beat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Escape Portal */}
        {gameState.hasEscapeKey && (
          <div className="bg-gradient-to-r from-gold-500 to-amber-500 rounded-xl p-6 mb-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">{t.boxing.escapeAvailable}</h3>
            <button
              onClick={handleEscape}
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-4 rounded-lg font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              {t.boxing.escape}
            </button>
          </div>
        )}

        {/* NPC Character */}
        <div className="text-center">
          <button
            onClick={handleNPCInteraction}
            className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
          >
            <User className="w-5 h-5" />
            {t.boxing.talkToMaster}
          </button>
        </div>

        {/* Poem Display */}
        {showPoem && (
          <PoemCreator
            poemId="boxing-rhythm"
            language={language}
            onClose={() => setShowPoem(false)}
            title={t.poems.boxingTitle}
            theme="rhythm"
          />
        )}

        {/* NPC Dialogue */}
        {showNPC && (
          <NPCDialogue
            npcId="boxing-master"
            language={language}
            onClose={() => setShowNPC(false)}
          />
        )}
      </div>
    </div>
  );
};

export default BoxingRoom;