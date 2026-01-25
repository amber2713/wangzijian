import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, Telescope, Mountain, Cloud, Zap } from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import InventoryPanel from '../components/InventoryPanel';
import NPCInteraction from '../components/NPCInteraction';
import AreaTransition from '../components/AreaTransition'; // 添加缺失的导入

const WindowArea: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useGame();
  const [currentView, setCurrentView] = useState<'campus' | 'parallel' | 'future'>('campus');

  useEffect(() => {
    dispatch({ type: 'CHANGE_LOCATION', payload: 'windows' });
  }, [dispatch]);

  const handleLookThroughWindow = (view: 'campus' | 'parallel' | 'future') => {
    setCurrentView(view);
    dispatch({ type: 'ADD_MEMORY_FRAGMENT', payload: `window-vision-${view}` });
    
    if (view === 'future') {
      dispatch({ type: 'SET_STORY_FLAG', payload: { flag: 'sawFuture', value: true } });
    }
  };

  const handleMeetWatcher = () => {
    dispatch({ type: 'ADD_INVENTORY_ITEM', payload: "Mystic Tea" });
    dispatch({ type: 'UPDATE_NPC_RELATIONSHIP', payload: { npc: 'The Watcher', change: 1 } });
  };

  const getViewDescription = () => {
    switch (currentView) {
      case 'campus':
        return "The familiar USTC campus spreads before you. Students walk between buildings, carrying the weight of knowledge and dreams. Everything appears normal, yet you sense hidden depths beneath the surface.";
      case 'parallel':
        return "The same campus, but different. The buildings are crystalline structures that pulse with inner light. Students float between classes, their thoughts visible as colorful auras. This is USTC as it exists in a parallel dimension where science and magic are one.";
      case 'future':
        return "Decades from now, USTC has become a sprawling complex of impossible architecture. Towers spiral into the clouds, connected by bridges of pure energy. Students and AI entities learn together in harmony. This is the future that your choices here will help create.";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-purple-900 to-slate-900">
      <div className="min-h-screen bg-black/30 backdrop-blur-sm">
        <InventoryPanel />
        
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
                <Eye className="w-8 h-8 text-purple-400" />
                Window Alcoves
              </h1>
              <p className="text-purple-300">Portals to other realities</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Telescope className="w-5 h-5 text-purple-400" />
                  Dimensional Windows
                </h2>
                
                <div className="space-y-3 mb-4">
                  <button
                    onClick={() => handleLookThroughWindow('campus')}
                    className={`w-full p-3 rounded-lg border transition-all ${
                      currentView === 'campus' 
                        ? 'bg-purple-900/50 border-purple-400 text-white' 
                        : 'bg-slate-700/50 border-slate-500 text-purple-200 hover:border-purple-500'
                    }`}
                  >
                    Current Reality
                  </button>
                  
                  <button
                    onClick={() => handleLookThroughWindow('parallel')}
                    className={`w-full p-3 rounded-lg border transition-all ${
                      currentView === 'parallel' 
                        ? 'bg-purple-900/50 border-purple-400 text-white' 
                        : 'bg-slate-700/50 border-slate-500 text-purple-200 hover:border-purple-500'
                    }`}
                  >
                    Parallel Dimension
                  </button>
                  
                  <button
                    onClick={() => handleLookThroughWindow('future')}
                    className={`w-full p-3 rounded-lg border transition-all ${
                      currentView === 'future' 
                        ? 'bg-purple-900/50 border-purple-400 text-white' 
                        : 'bg-slate-700/50 border-slate-500 text-purple-200 hover:border-purple-500'
                    }`}
                  >
                    Future Timeline
                  </button>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4 border border-purple-500/20">
                  <p className="text-purple-200 leading-relaxed">
                    {getViewDescription()}
                  </p>
                </div>
              </div>

              <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Mountain className="w-5 h-5 text-purple-400" />
                  Campus Observations
                </h2>
                <div className="space-y-2 text-sm">
                  <p className="text-purple-200 flex items-center gap-2">
                    <Cloud className="w-4 h-4" />
                    The clouds above form perfect fractals
                  </p>
                  <p className="text-purple-200 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Lightning strikes in the distance follow Fibonacci sequences
                  </p>
                  <p className="text-purple-200 flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Some buildings appear to be watching you back
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                <h2 className="text-xl font-bold text-white mb-4">Mysterious Figures</h2>
                
                <NPCInteraction
                  name="The Watcher"
                  description="A figure who seems to exist between dimensions"
                  dialogue="You see more than most, don't you? The windows here don't just show different places - they show different possibilities. I've been watching students like you for decades, waiting for someone who can perceive the truth. The cafeteria is not what it seems."
                  mood="mysterious"
                  choices={[
                    {
                      text: "What is the truth about this place?",
                      response: "This cafeteria is a nexus point where multiple realities converge. Every choice made here ripples across dimensions. You're not just a student - you're a reality architect. This tea will help you see the connections more clearly.",
                      action: handleMeetWatcher
                    },
                    {
                      text: "How long have you been watching?",
                      response: "Time is relative here. I've been watching since before the university was built, and I'll be watching long after it's gone. But you... you're different. You have the potential to change everything."
                    },
                    {
                      text: "What do you want from me?",
                      response: "I want you to understand your role in the grand design. Every student who passes through here leaves a mark on reality itself. Your choices matter more than you know."
                    }
                  ]}
                />
              </div>

              {state.storyFlags.sawFuture && (
                <AreaTransition
                  to="/final-chamber"
                  title="The Convergence Point"
                  description="Where all realities meet and the final truth awaits"
                  requires={["Mystic Tea", "Reality Sandwich"]}
                  hidden={true}
                />
              )}
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
    </div>
  );
};

export default WindowArea;