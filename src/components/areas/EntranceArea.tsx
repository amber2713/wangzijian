import React, { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { translations } from '../../data/translations';
import NPCDialogue from '../NPCDialogue';
import { Users, ArrowRight } from 'lucide-react';

interface EntranceAreaProps {
  language: 'en' | 'zh';
}

const EntranceArea: React.FC<EntranceAreaProps> = ({ language }) => {
  const { gameState, progressStory, interactWithNPC } = useGame();
  const [showNPC, setShowNPC] = useState(false);
  const t = translations[language];

  const handleNPCInteraction = () => {
    setShowNPC(true);
    if (!gameState.npcInteractions['guide']) {
      interactWithNPC('guide');
      progressStory();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Stadium Entrance Visual */}
        <div className="relative mb-8">
          <div className="w-full h-96 bg-gradient-to-b from-blue-800/50 to-blue-900/50 rounded-2xl backdrop-blur-sm border border-blue-500/30 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                {t.areas.entrance}
              </h2>
              <p className="text-blue-200 text-lg max-w-2xl">
                {t.entrance.description}
              </p>
            </div>
          </div>
          
          {/* Interactive Elements */}
          <div className="absolute bottom-4 right-4">
            <button
              onClick={handleNPCInteraction}
              className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
            >
              <Users className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Story Introduction */}
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 mb-6">
          <p className="text-white text-lg leading-relaxed">
            {t.entrance.intro}
          </p>
        </div>

        {/* Exploration Hint */}
        {gameState.storyProgress > 0 && (
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30">
            <div className="flex items-center justify-center gap-3 text-purple-200">
              <ArrowRight className="w-5 h-5" />
              <span>{t.entrance.explorationHint}</span>
            </div>
          </div>
        )}

        {/* NPC Dialogue */}
        {showNPC && (
          <NPCDialogue
            npcId="guide"
            language={language}
            onClose={() => setShowNPC(false)}
          />
        )}
      </div>
    </div>
  );
};

export default EntranceArea;