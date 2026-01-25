import React, { useState } from 'react';
import { npcDatabase } from '../data/npcs';
import { X, MessageCircle } from 'lucide-react';

interface NPCDialogueProps {
  npcId: string;
  language: 'en' | 'zh';
  onClose: () => void;
}

const NPCDialogue: React.FC<NPCDialogueProps> = ({ npcId, language, onClose }) => {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  
  const npc = npcDatabase[npcId];
  if (!npc) return null;

  const dialogue = npc.dialogue[language];
  const currentDialogue = dialogue[currentDialogueIndex];

  const handleNext = () => {
    if (currentDialogueIndex < dialogue.length - 1) {
      setCurrentDialogueIndex(prev => prev + 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl max-w-2xl w-full p-8 border border-blue-500/30 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{npc.name[language]}</h3>
              <p className="text-gray-400 text-sm">{npc.title[language]}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-black/30 rounded-xl p-6 mb-6 min-h-32">
          <p className="text-white text-lg leading-relaxed">
            {currentDialogue}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">
            {currentDialogueIndex + 1} / {dialogue.length}
          </span>
          <button
            onClick={handleNext}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            {currentDialogueIndex < dialogue.length - 1 ? 
              (language === 'en' ? 'Next' : '下一个') : 
              (language === 'en' ? 'Close' : '关闭')
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default NPCDialogue;