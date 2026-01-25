import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Scroll, Key, Lock } from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import InventoryPanel from '../components/InventoryPanel';
import NPCInteraction from '../components/NPCInteraction';

const HiddenLibrary: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useGame();

  useEffect(() => {
    dispatch({ type: 'CHANGE_LOCATION', payload: 'hidden-library' });
    dispatch({ type: 'DISCOVER_AREA', payload: 'hidden-library' });
  }, [dispatch]);

  const handleReadAncientText = () => {
    dispatch({ type: 'ADD_MEMORY_FRAGMENT', payload: 'ancient-knowledge' });
    dispatch({ type: 'COMPLETE_TASK', payload: 'discovered-library-secrets' });
  };

  const handleMeetLibrarian = () => {
    dispatch({ type: 'ADD_INVENTORY_ITEM', payload: "Temporal Coin" });
    dispatch({ type: 'UPDATE_NPC_RELATIONSHIP', payload: { npc: 'The Librarian', change: 2 } });
  };

  return (
    <div className="min-h-screen p-6">
      <InventoryPanel />
      
      {/* 知识碎片面板 - 固定在右下角 */}
      <div className="fixed bottom-6 right-6 bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30 z-40 max-w-xs">
        <h3 className="text-white font-bold mb-3 flex items-center gap-2">
          <Key className="w-5 h-5 text-purple-400" />
          Knowledge Fragments
        </h3>
        <div className="space-y-2 text-sm max-h-40 overflow-y-auto">
          {state.memoryFragments.map((fragment, index) => (
            <p key={index} className="text-purple-200 flex items-center gap-2">
              <Lock className="w-3 h-3 flex-shrink-0" />
              <span className="break-words">{fragment.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
            </p>
          ))}
          {state.memoryFragments.length === 0 && (
            <p className="text-purple-300 italic">No fragments collected yet...</p>
          )}
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/cafeteria')}
            className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-purple-400" />
              The Hidden Archive
            </h1>
            <p className="text-purple-300">Repository of forbidden knowledge</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Scroll className="w-5 h-5 text-purple-400" />
                Ancient Texts
              </h2>
              <p className="text-purple-200 leading-relaxed mb-4">
                Shelves stretch impossibly high, filled with books that shouldn't exist. Tomes 
                written in languages that predate human civilization sit next to research papers 
                from futures that haven't happened yet. The air itself seems thick with knowledge.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  className="p-4 bg-purple-900/30 rounded-lg border border-purple-500/20 hover-lift cursor-pointer"
                  onClick={handleReadAncientText}
                >
                  <h4 className="text-white font-semibold mb-2">
                    "The Cafeteria Codex"
                  </h4>
                  <p className="text-purple-200 text-sm">
                    A leather-bound tome that details the true history of this place. 
                    The pages turn themselves, revealing secrets as you're ready to understand them.
                  </p>
                </div>
                
                <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-500/20">
                  <h4 className="text-white font-semibold mb-2">
                    "Quantum Gastronomy Principles"
                  </h4>
                  <p className="text-blue-200 text-sm">
                    Research notes on how food can be used to manipulate reality at the quantum level. 
                    The equations seem to move when you're not looking directly at them.
                  </p>
                </div>
                
                <div className="p-4 bg-green-900/30 rounded-lg border border-green-500/20">
                  <h4 className="text-white font-semibold mb-2">
                    "Student Testimonials: 1952-2024"
                  </h4>
                  <p className="text-green-200 text-sm">
                    Accounts from students who discovered the cafeteria's secrets. Many describe 
                    similar experiences: the food that remembers, the walls that listen, the exit that appears only to those who truly understand.
                  </p>
                </div>
                
                <div className="p-4 bg-red-900/30 rounded-lg border border-red-500/20">
                  <h4 className="text-white font-semibold mb-2">
                    "The Escape Protocols"
                  </h4>
                  <p className="text-red-200 text-sm">
                    A warning disguised as instructions. "To leave this place, one must first 
                    understand why they came. The exit is not a door - it is a choice."
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
              <h2 className="text-xl font-bold text-white mb-4">The Librarian</h2>
              
              <NPCInteraction
                name="The Librarian"
                description="An ageless figure who tends to impossible books"
                dialogue="Ah, another seeker of truth. You've found your way here, which means you're beginning to understand. This library exists in the spaces between thoughts, in the pause between heartbeats. Every book here was written by someone who experienced what you're experiencing now."
                mood="mysterious"
                choices={[
                  {
                    text: "How do I get out of here?",
                    response: "The same way you got in - through understanding. But first, you must collect all the pieces of the puzzle. This coin will help you navigate the temporal streams. Use it wisely.",
                    action: handleMeetLibrarian
                  },
                  {
                    text: "What is this place really?",
                    response: "This cafeteria is a testing ground, a place where consciousness is refined and expanded. Every student who eats here becomes part of something larger. You're not trapped - you're being prepared."
                  },
                  {
                    text: "Who are you?",
                    response: "I am the keeper of stories, the guardian of possibilities. I was once a student like you, seeking answers. Now I help others find their own truths. The cycle continues."
                  }
                ]}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/cafeteria')}
            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
          >
            Return to Main Hall
          </button>
        </div>
      </div>
    </div>
  );
};

export default HiddenLibrary;