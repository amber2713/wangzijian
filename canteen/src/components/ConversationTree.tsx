import React, { useState } from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';

interface Choice {
  text: string;
  response: string;
  action?: () => void;
  requires?: string[];
  unlocks?: string[];
}

interface ConversationTreeProps {
  npcName: string;
  npcDescription: string;
  initialDialogue: string;
  choices: Choice[];
  onClose: () => void;
}

const ConversationTree: React.FC<ConversationTreeProps> = ({
  npcName,
  npcDescription,
  initialDialogue,
  choices,
  onClose
}) => {
  const [currentDialogue, setCurrentDialogue] = useState(initialDialogue);
  const [availableChoices, setAvailableChoices] = useState(choices);
  const [conversationHistory, setConversationHistory] = useState<string[]>([initialDialogue]);

  const handleChoice = (choice: Choice) => {
    const newHistory = [...conversationHistory, `You: ${choice.text}`, choice.response];
    setConversationHistory(newHistory);
    setCurrentDialogue(choice.response);
    
    if (choice.action) {
      choice.action();
    }

    // Filter choices based on unlocked content
    if (choice.unlocks) {
      const newChoices = availableChoices.filter(c => 
        !choice.unlocks?.includes(c.text) || c.requires?.every(req => true)
      );
      setAvailableChoices(newChoices);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-purple-500/30">
        <div className="flex items-center gap-3 mb-4">
          <MessageCircle className="w-6 h-6 text-purple-400" />
          <div>
            <h3 className="text-white font-bold text-lg">{npcName}</h3>
            <p className="text-purple-300 text-sm">{npcDescription}</p>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 mb-4 max-h-60 overflow-y-auto">
          {conversationHistory.map((line, index) => (
            <p 
              key={index} 
              className={`mb-2 ${
                line.startsWith('You:') 
                  ? 'text-cyan-300 italic' 
                  : 'text-purple-200'
              }`}
            >
              {line}
            </p>
          ))}
        </div>

        <div className="space-y-2 mb-4">
          {availableChoices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleChoice(choice)}
              className="choice-button w-full text-left p-3 bg-purple-900/30 hover:bg-purple-800/50 rounded-lg border border-purple-500/30 text-purple-200 transition-all duration-300 flex items-center justify-between group"
            >
              <span>{choice.text}</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
        >
          End Conversation
        </button>
      </div>
    </div>
  );
};

export default ConversationTree;