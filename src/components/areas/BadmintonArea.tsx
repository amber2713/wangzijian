import React, { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { translations } from '../../data/translations';
import PoemCreator from '../PoemCreator';
import NPCDialogue from '../NPCDialogue';
import { Activity, Wind, User, Feather } from 'lucide-react';

interface BadmintonAreaProps {
  language: 'en' | 'zh';
}

const BadmintonArea: React.FC<BadmintonAreaProps> = ({ language }) => {
  const { gameState, addPoem, addClue, progressStory, interactWithNPC } = useGame();
  const [shuttleTrajectory, setShuttleTrajectory] = useState<string[]>([]);
  const [showPoem, setShowPoem] = useState(false);
  const [showNPC, setShowNPC] = useState(false);
  const [currentShuttle, setCurrentShuttle] = useState({ x: 50, y: 50 });
  const t = translations[language];

  const trajectoryPattern = ['high', 'cross', 'low', 'smash']; // Pattern for unlocking poem

  const handleShuttleHit = (type: string) => {
    const newTrajectory = [...shuttleTrajectory, type];
    setShuttleTrajectory(newTrajectory);

    // Animate shuttle
    const movements = {
      high: { x: Math.random() * 80 + 10, y: 20 },
      low: { x: Math.random() * 80 + 10, y: 80 },
      cross: { x: currentShuttle.x < 50 ? 80 : 20, y: Math.random() * 60 + 20 },
      smash: { x: Math.random() * 80 + 10, y: 90 }
    };

    setCurrentShuttle(movements[type as keyof typeof movements] || { x: 50, y: 50 });

    if (newTrajectory.length === trajectoryPattern.length) {
      if (JSON.stringify(newTrajectory) === JSON.stringify(trajectoryPattern)) {
        if (!gameState.unlockedPoems.includes('badminton-grace')) {
          addPoem('badminton-grace');
          addClue('elevation-clue');
          progressStory();
          setShowPoem(true);
        }
      }
      setTimeout(() => setShuttleTrajectory([]), 2000);
    }
  };

  const handleNPCInteraction = () => {
    setShowNPC(true);
    if (!gameState.npcInteractions['badminton-coach']) {
      interactWithNPC('badminton-coach');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Activity className="w-10 h-10 text-purple-400" />
            {t.areas.badminton}
          </h2>
          <p className="text-purple-200 text-lg">
            {t.badminton.description}
          </p>
        </div>

        {/* Badminton Court */}
        <div className="bg-gradient-to-br from-green-700 to-green-800 rounded-2xl p-8 mb-6 border-4 border-white relative h-96">
          {/* Court Lines */}
          <div className="absolute inset-4 border-2 border-white rounded-lg">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white transform -translate-x-1/2"></div>
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-white transform -translate-y-1/2"></div>
          </div>

          {/* Shuttlecock */}
          <div 
            className="absolute w-4 h-4 bg-white rounded-full shadow-lg transition-all duration-500 ease-out"
            style={{ 
              left: `${currentShuttle.x}%`, 
              top: `${currentShuttle.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <Feather className="w-3 h-3 text-gray-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>

          {/* Shot Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {[
              { type: 'high', label: t.badminton.shots.high, color: 'from-blue-500 to-blue-600' },
              { type: 'low', label: t.badminton.shots.low, color: 'from-green-500 to-green-600' },
              { type: 'cross', label: t.badminton.shots.cross, color: 'from-yellow-500 to-yellow-600' },
              { type: 'smash', label: t.badminton.shots.smash, color: 'from-red-500 to-red-600' }
            ].map((shot) => (
              <button
                key={shot.type}
                onClick={() => handleShuttleHit(shot.type)}
                className={`
                  px-4 py-2 bg-gradient-to-r ${shot.color} text-white rounded-lg 
                  transition-all duration-300 transform hover:scale-105 text-sm font-semibold
                `}
              >
                {shot.label}
              </button>
            ))}
          </div>

          {/* Trajectory Display */}
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
            <div className="flex space-x-1">
              {shuttleTrajectory.map((shot, index) => (
                <div
                  key={index}
                  className="w-3 h-3 rounded-full bg-purple-400"
                  title={shot}
                ></div>
              ))}
              {Array.from({ length: trajectoryPattern.length - shuttleTrajectory.length }).map((_, index) => (
                <div
                  key={`empty-${index}`}
                  className="w-3 h-3 rounded-full border border-gray-500"
                ></div>
              ))}
            </div>
            <p className="text-white text-xs mt-2">{t.badminton.hint}</p>
          </div>
        </div>

        {/* NPC Character */}
        <div className="text-center">
          <button
            onClick={handleNPCInteraction}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
          >
            <User className="w-5 h-5" />
            {t.badminton.talkToCoach}
          </button>
        </div>

        {/* Poem Display */}
        {showPoem && (
          <PoemCreator
            poemId="badminton-grace"
            language={language}
            onClose={() => setShowPoem(false)}
            title={t.poems.badmintonTitle}
            theme="grace"
          />
        )}

        {/* NPC Dialogue */}
        {showNPC && (
          <NPCDialogue
            npcId="badminton-coach"
            language={language}
            onClose={() => setShowNPC(false)}
          />
        )}
      </div>
    </div>
  );
};

export default BadmintonArea;