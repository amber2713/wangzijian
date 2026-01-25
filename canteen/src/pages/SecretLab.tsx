import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FlaskRound as Flask, Zap, Atom, Database } from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import InventoryPanel from '../components/InventoryPanel';
import NPCInteraction from '../components/NPCInteraction';

const SecretLab: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useGame();

  useEffect(() => {
    dispatch({ type: 'CHANGE_LOCATION', payload: 'secret-lab' });
    dispatch({ type: 'DISCOVER_AREA', payload: 'secret-lab' });
  }, [dispatch]);

  const handleMeetScientist = () => {
    dispatch({ type: 'ADD_MEMORY_FRAGMENT', payload: 'experiment-truth' });
    dispatch({ type: 'UPDATE_NPC_RELATIONSHIP', payload: { npc: 'Dr. Liu', change: 2 } });
    dispatch({ type: 'SET_STORY_FLAG', payload: { flag: 'understoodExperiment', value: true } });
  };

  const handleActivateDevice = () => {
    dispatch({ type: 'COMPLETE_TASK', payload: 'activated-consciousness-device' });
    dispatch({ type: 'SET_STORY_FLAG', payload: { flag: 'deviceActivated', value: true } });
    
    // Check if player has enough understanding to unlock escape
    const requiredFragments = ['ancient-knowledge', 'experiment-truth', 'temporal-mastery'];
    const hasAllFragments = requiredFragments.every(fragment => 
      state.memoryFragments.includes(fragment)
    );
    
    if (hasAllFragments) {
      dispatch({ type: 'UNLOCK_ESCAPE_ROUTE' });
    }
  };

  return (
    <div className="min-h-screen p-6">
      <InventoryPanel />
      
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/kitchen')}
            className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Flask className="w-8 h-8 text-purple-400" />
              Secret Research Laboratory
            </h1>
            <p className="text-purple-300">The true purpose of the cafeteria revealed</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                The Consciousness Amplifier
              </h2>
              <p className="text-purple-200 leading-relaxed mb-4">
                At the center of the lab stands a massive device that pulses with ethereal energy. 
                Cables snake from it into the walls, connecting to every part of the cafeteria above. 
                This machine doesn't just monitor consciousness - it enhances it, expands it, 
                connects it to the greater web of human knowledge.
              </p>
              
              {state.storyFlags.understoodExperiment && !state.storyFlags.deviceActivated && (
                <button
                  onClick={handleActivateDevice}
                  className="w-full py-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 rounded-lg text-white font-medium transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  Activate the Device
                </button>
              )}
              
              {state.storyFlags.deviceActivated && (
                <div className="p-4 bg-yellow-900/30 rounded-lg border border-yellow-500/20">
                  <p className="text-yellow-200 font-semibold">
                    The device hums to life, and suddenly you understand everything. The cafeteria, 
                    the magical food, the strange encounters - it's all part of a grand experiment 
                    in human consciousness evolution.
                  </p>
                </div>
              )}
            </div>

            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-400" />
                Research Data
              </h2>
              <div className="space-y-3">
                <div className="p-3 bg-blue-900/30 rounded-lg border border-blue-500/20">
                  <h4 className="text-white font-semibold mb-1">Project: Cognitive Nexus</h4>
                  <p className="text-blue-200 text-sm">
                    Studying how shared dining experiences can create collective consciousness networks.
                  </p>
                </div>
                <div className="p-3 bg-purple-900/30 rounded-lg border border-purple-500/20">
                  <h4 className="text-white font-semibold mb-1">Experiment: Reality Perception</h4>
                  <p className="text-purple-200 text-sm">
                    Testing how altered food can expand human perception beyond normal limitations.
                  </p>
                </div>
                <div className="p-3 bg-green-900/30 rounded-lg border border-green-500/20">
                  <h4 className="text-white font-semibold mb-1">Goal: Transcendence Protocol</h4>
                  <p className="text-green-200 text-sm">
                    Preparing humanity for the next stage of evolution through enhanced consciousness.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
              <h2 className="text-xl font-bold text-white mb-4">Lead Researcher</h2>
              
              <NPCInteraction
                name="Dr. Liu"
                description="Brilliant scientist with otherworldly knowledge"
                dialogue="You've made it this far, which means you're ready for the truth. This cafeteria is the culmination of decades of research into consciousness, reality, and human potential. Every student who eats here becomes part of our grand experiment in evolution."
                mood="mysterious"
                choices={[
                  {
                    text: "What kind of experiment?",
                    response: "We're preparing humanity for contact with higher-dimensional beings. The food, the experiences, the memories - they're all designed to expand human consciousness beyond its current limitations. You're not a test subject - you're a pioneer.",
                    action: handleMeetScientist
                  },
                  {
                    text: "Is this ethical?",
                    response: "Ethics become complex when you're working for the survival and evolution of the entire species. Every student who participates becomes more than they were before. The question is: are you ready to become more than human?"
                  },
                  {
                    text: "How do I get out?",
                    response: "The exit has always been there, waiting for you to understand what you're choosing to leave behind. But first, you must activate the consciousness amplifier. Only then will you truly comprehend your options."
                  }
                ]}
              />
            </div>

            {state.escapeRouteUnlocked && (
              <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl p-6 border border-purple-400 glow">
                <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                  <Atom className="w-5 h-5 text-purple-400" />
                  Escape Route Unlocked
                </h3>
                <p className="text-purple-200 mb-4">
                  You now understand the true nature of this place and your role in the grand 
                  experiment. The choice is yours: embrace transcendence or return to ordinary reality.
                </p>
                <button
                  onClick={() => navigate('/final-chamber')}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg text-white font-medium transition-all duration-300"
                >
                  Proceed to Final Chamber
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/cafeteria')}
            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
          >
            Return to Cafeteria
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecretLab;