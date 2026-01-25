import React, { useState } from 'react';
import { User, MessageSquare } from 'lucide-react';
import ConversationTree from './ConversationTree';

interface NPCInteractionProps {
  name: string;
  description: string;
  dialogue: string;
  choices: Array<{
    text: string;
    response: string;
    action?: () => void;
    requires?: string[];
    unlocks?: string[];
  }>;
  mood?: 'friendly' | 'mysterious' | 'suspicious' | 'helpful';
}

const NPCInteraction: React.FC<NPCInteractionProps> = ({
  name,
  description,
  dialogue,
  choices,
  mood = 'friendly'
}) => {
  const [showConversation, setShowConversation] = useState(false);

  const getMoodColor = () => {
    switch (mood) {
      case 'friendly': return 'border-green-500/50 hover:border-green-400';
      case 'mysterious': return 'border-purple-500/50 hover:border-purple-400';
      case 'suspicious': return 'border-red-500/50 hover:border-red-400';
      case 'helpful': return 'border-blue-500/50 hover:border-blue-400';
      default: return 'border-gray-500/50 hover:border-gray-400';
    }
  };

  const getMoodBg = () => {
    switch (mood) {
      case 'friendly': return 'bg-green-900/30';
      case 'mysterious': return 'bg-purple-900/30';
      case 'suspicious': return 'bg-red-900/30';
      case 'helpful': return 'bg-blue-900/30';
      default: return 'bg-gray-900/30';
    }
  };

  return (
    <>
      <div 
        className={`${getMoodBg()} rounded-lg p-4 border ${getMoodColor()} hover-lift cursor-pointer transition-all duration-300`}
        onClick={() => setShowConversation(true)}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-slate-700">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-white font-semibold">{name}</h4>
            <p className="text-purple-200 text-sm">{description}</p>
          </div>
          <MessageSquare className="w-5 h-5 text-purple-400" />
        </div>
      </div>

      {showConversation && (
        <ConversationTree
          npcName={name}
          npcDescription={description}
          initialDialogue={dialogue}
          choices={choices}
          onClose={() => setShowConversation(false)}
        />
      )}
    </>
  );
};

export default NPCInteraction;