import React, { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { translations } from '../../data/translations';
import PoemCreator from '../PoemCreator';
import NPCDialogue from '../NPCDialogue';
import { Dumbbell, TrendingUp, User, Zap } from 'lucide-react';

interface GymAreaProps {
  language: 'en' | 'zh';
}

const GymArea: React.FC<GymAreaProps> = ({ language }) => {
  const { gameState, addPoem, addClue, progressStory, interactWithNPC } = useGame();
  const [strength, setStrength] = useState(0);
  const [endurance, setEndurance] = useState(0);
  const [focus, setFocus] = useState(0);
  const [showPoem, setShowPoem] = useState(false);
  const [showNPC, setShowNPC] = useState(false);
  const [currentExercise, setCurrentExercise] = useState<string | null>(null);
  const t = translations[language];

  const exercises = [
    { id: 'pushups', name: t.gym.exercises.pushups, stat: 'strength', color: 'from-red-500 to-red-600' },
    { id: 'running', name: t.gym.exercises.running, stat: 'endurance', color: 'from-blue-500 to-blue-600' },
    { id: 'meditation', name: t.gym.exercises.meditation, stat: 'focus', color: 'from-purple-500 to-purple-600' }
  ];

  const handleExercise = (exerciseId: string, statType: string) => {
    setCurrentExercise(exerciseId);
    
    setTimeout(() => {
      if (statType === 'strength') setStrength(prev => Math.min(prev + 20, 100));
      if (statType === 'endurance') setEndurance(prev => Math.min(prev + 20, 100));
      if (statType === 'focus') setFocus(prev => Math.min(prev + 20, 100));
      
      setCurrentExercise(null);
      
      // Check if all stats are high enough to unlock poem
      if (strength >= 80 && endurance >= 80 && focus >= 80) {
        if (!gameState.unlockedPoems.includes('gym-strength')) {
          addPoem('gym-strength');
          addClue('determination-clue');
          progressStory();
          setShowPoem(true);
        }
      }
    }, 1500);
  };

  const handleNPCInteraction = () => {
    setShowNPC(true);
    if (!gameState.npcInteractions['gym-trainer']) {
      interactWithNPC('gym-trainer');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Dumbbell className="w-10 h-10 text-red-400" />
            {t.areas.gym}
          </h2>
          <p className="text-red-200 text-lg">
            {t.gym.description}
          </p>
        </div>

        {/* Stats Display */}
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 mb-6">
          <h3 className="text-white text-xl font-semibold mb-4 text-center">{t.gym.stats.title}</h3>
          <div className="grid grid-cols-3 gap-6">
            {[
              { name: t.gym.stats.strength, value: strength, color: 'red' },
              { name: t.gym.stats.endurance, value: endurance, color: 'blue' },
              { name: t.gym.stats.focus, value: focus, color: 'purple' }
            ].map((stat) => (
              <div key={stat.name} className="text-center">
                <p className="text-white font-medium mb-2">{stat.name}</p>
                <div className="bg-gray-700 rounded-full h-4 mb-2">
                  <div 
                    className={`bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 h-4 rounded-full transition-all duration-500`}
                    style={{ width: `${stat.value}%` }}
                  ></div>
                </div>
                <span className="text-gray-300 text-sm">{stat.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Exercise Equipment */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 mb-6">
          <div className="grid grid-cols-3 gap-6">
            {exercises.map((exercise) => (
              <button
                key={exercise.id}
                onClick={() => handleExercise(exercise.id, exercise.stat)}
                disabled={currentExercise !== null}
                className={`
                  relative h-32 bg-gradient-to-br ${exercise.color} rounded-xl text-white font-semibold
                  transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed
                  ${currentExercise === exercise.id ? 'animate-pulse scale-110' : ''}
                `}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <TrendingUp className="w-8 h-8 mb-2" />
                  <span>{exercise.name}</span>
                </div>
                {currentExercise === exercise.id && (
                  <div className="absolute inset-0 bg-white/20 rounded-xl flex items-center justify-center">
                    <Zap className="w-8 h-8 text-yellow-300 animate-spin" />
                  </div>
                )}
              </button>
            ))}
          </div>
          
          <p className="text-center text-gray-300 mt-4">
            {t.gym.hint}
          </p>
        </div>

        {/* NPC Character */}
        <div className="text-center">
          <button
            onClick={handleNPCInteraction}
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
          >
            <User className="w-5 h-5" />
            {t.gym.talkToTrainer}
          </button>
        </div>

        {/* Poem Display */}
        {showPoem && (
          <PoemCreator
            poemId="gym-strength"
            language={language}
            onClose={() => setShowPoem(false)}
            title={t.poems.gymTitle}
            theme="strength"
          />
        )}

        {/* NPC Dialogue */}
        {showNPC && (
          <NPCDialogue
            npcId="gym-trainer"
            language={language}
            onClose={() => setShowNPC(false)}
          />
        )}
      </div>
    </div>
  );
};

export default GymArea;