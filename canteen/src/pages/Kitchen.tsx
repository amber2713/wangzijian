import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChefHat, Flame, Beaker, Users, Zap } from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import InventoryPanel from '../components/InventoryPanel';
import NPCInteraction from '../components/NPCInteraction';
import AreaTransition from '../components/AreaTransition';

const Kitchen: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useGame();

  useEffect(() => {
    dispatch({ type: 'CHANGE_LOCATION', payload: 'kitchen' });
  }, [dispatch]);

  const handleMeetChef = () => {
    dispatch({ type: 'ADD_INVENTORY_ITEM', payload: "Reality Sandwich" });
    dispatch({ type: 'UPDATE_NPC_RELATIONSHIP', payload: { npc: 'Chef Zhang', change: 2 } });
    dispatch({ type: 'SET_STORY_FLAG', payload: { flag: 'learnedCookingSecrets', value: true } });
  };

  const handleDiscoverLab = () => {
    dispatch({ type: 'DISCOVER_AREA', payload: 'secret-lab' });
    dispatch({ type: 'ADD_INVENTORY_ITEM', payload: "Temporal Coin" });
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="min-h-screen bg-black/30 backdrop-blur-sm rounded-xl p-6">
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
                <ChefHat className="w-8 h-8 text-orange-400" />
                The Mystical Kitchen
              </h1>
              <p className="text-purple-300">Where culinary science meets the supernatural</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-400" />
                  The Cooking Stations
                </h2>
                <p className="text-purple-200 leading-relaxed mb-4">
                  The kitchen hums with an energy that goes beyond mere cooking. Massive woks float 
                  slightly above their burners, stirring themselves with invisible hands. The 
                  refrigeration units emit a soft blue glow, and you can hear whispers coming from 
                  within - voices speaking in languages that predate human civilization.
                </p>
                <p className="text-purple-200 leading-relaxed">
                  Steam rises in perfect geometric patterns, forming complex mathematical equations 
                  before dissipating. This is where the impossible becomes edible.
                </p>
              </div>

              <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Beaker className="w-5 h-5 text-green-400" />
                  Experimental Cooking
                </h2>
                <div className="space-y-3">
                  <div className="p-3 bg-purple-900/30 rounded-lg border border-purple-500/20">
                    <p className="text-purple-200 text-sm">
                      <strong>Molecular Gastronomy Station:</strong> Where flavors are deconstructed 
                      into their quantum components and reassembled into new forms of experience.
                    </p>
                  </div>
                  <div className="p-3 bg-blue-900/30 rounded-lg border border-blue-500/20">
                    <p className="text-blue-200 text-sm">
                      <strong>Temporal Preservation Unit:</strong> Keeps ingredients fresh across 
                      multiple timelines simultaneously.
                    </p>
                  </div>
                  <div className="p-3 bg-green-900/30 rounded-lg border border-green-500/20">
                    <p className="text-green-200 text-sm">
                      <strong>Memory Infusion Chamber:</strong> Imbues food with the experiences 
                      and knowledge of previous diners.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  Kitchen Staff
                </h2>
                
                <div className="space-y-3">
                  <NPCInteraction
                    name="Chef Zhang"
                    description="Master chef with eyes that have seen other worlds"
                    dialogue="Welcome to my domain, young scholar. I am not merely a chef - I am a curator of experiences, a weaver of realities through cuisine. Each dish I create carries the essence of knowledge, the flavor of discovery. Would you like to taste something that will change your perception forever?"
                    mood="mysterious"
                    choices={[
                      {
                        text: "What makes your food so special?",
                        response: "I cook with ingredients from multiple dimensions. Time, space, memory, dreams - all are spices in my kitchen. This Reality Sandwich will show you the true nature of this place. But be warned - once you see, you cannot unsee.",
                        action: handleMeetChef
                      },
                      {
                        text: "I'm looking for a way out of here.",
                        response: "Ah, seeking escape? The exit is not a place, young one - it's a state of understanding. You must first comprehend what you're escaping from. Eat, learn, discover. Only then will the path reveal itself."
                      },
                      {
                        text: "Are you human?",
                        response: "I am what I need to be. Human, spirit, algorithm, dream - these are just different recipes for consciousness. What matters is not what I am, but what I can teach you."
                      }
                    ]}
                  />

                  <NPCInteraction
                    name="Assistant Cook Mei"
                    description="Young woman whose hands glow when she cooks"
                    dialogue="I've been working here since I was a student. The kitchen chose me, not the other way around. I can see the emotional residue left by every meal, every conversation. The walls here remember everything."
                    mood="friendly"
                    choices={[
                      {
                        text: "What do the walls remember?",
                        response: "Love, heartbreak, eureka moments, despair, hope... Every emotion that's ever been felt in this cafeteria is stored in the molecular structure of the building. Sometimes, late at night, you can hear them all at once."
                      },
                      {
                        text: "How did the kitchen choose you?",
                        response: "I was eating alone one night, crying over a failed experiment. The food started glowing, and I heard a voice telling me I belonged here. The next day, I quit my major and started working in the kitchen. Best decision I ever made."
                      }
                    ]}
                  />
                </div>
              </div>

              <AreaTransition
                to="/secret-lab"
                title="Hidden Laboratory"
                description="A secret research facility behind the industrial freezers"
                requires={["Reality Sandwich"]}
                hidden={true}
                onTransition={handleDiscoverLab}
              />
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

export default Kitchen;