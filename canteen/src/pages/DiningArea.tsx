import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Cpu, Atom, Users, Sparkles } from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import InventoryPanel from '../components/InventoryPanel';
import MagicalFood from '../components/MagicalFood';
import NPCInteraction from '../components/NPCInteraction';

const DiningArea: React.FC = () => {
  const { area } = useParams<{ area: string }>();
  const navigate = useNavigate();
  const { state, dispatch } = useGame();

  useEffect(() => {
    dispatch({ type: 'CHANGE_LOCATION', payload: `dining-${area}` });
  }, [area, dispatch]);

  const isEastern = area === 'east';
  const areaTitle = isEastern ? 'Eastern Dining Area' : 'Western Dining Area';
  const areaTheme = isEastern ? 'Computer Science Hub' : 'Physics & Mathematics Realm';
  const areaIcon = isEastern ? <Cpu className="w-6 h-6" /> : <Atom className="w-6 h-6" />;

  const handleConsumeMemoryBuns = () => {
    dispatch({ type: 'ADD_INVENTORY_ITEM', payload: "Memories' Buns" });
    dispatch({ type: 'ACTIVATE_MAGICAL_EFFECT', payload: 'memory-vision' });
    navigate('/memory-realm/student-memories');
  };

  const handleConsumeTimeSalad = () => {
    dispatch({ type: 'ADD_INVENTORY_ITEM', payload: "Time Salad" });
    dispatch({ type: 'ACTIVATE_MAGICAL_EFFECT', payload: 'temporal-sight' });
    navigate('/time-loop');
  };

  const handleConsumeQuantumSoup = () => {
    dispatch({ type: 'ADD_INVENTORY_ITEM', payload: "Quantum Soup" });
    dispatch({ type: 'ADD_MEMORY_FRAGMENT', payload: 'quantum-entanglement' });
  };

  const handleMeetStudent = () => {
    dispatch({ type: 'UPDATE_NPC_RELATIONSHIP', payload: { npc: 'Alex Chen', change: 1 } });
    dispatch({ type: 'ADD_INVENTORY_ITEM', payload: "Memory Fragment" });
  };

  const handleMeetProfessor = () => {
    dispatch({ type: 'UPDATE_NPC_RELATIONSHIP', payload: { npc: 'Dr. Wang', change: 1 } });
    dispatch({ type: 'SET_STORY_FLAG', payload: { flag: 'learnedAboutExperiment', value: true } });
  };

  return (
    <div className={`min-h-screen p-6 ${isEastern ? 'cafeteria-bg-2' : 'cafeteria-bg-3'}`}>
      <div className="min-h-screen bg-overlay">
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
              {areaIcon}
              {areaTitle}
            </h1>
            <p className="text-purple-300">{areaTheme}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                Magical Cuisine
              </h2>
              
              <div className="space-y-4">
                <MagicalFood
                  name="Memories' Buns"
                  description="Steamed buns that glow with an inner light"
                  effect="Experience the memories of those who ate here before"
                  onConsume={handleConsumeMemoryBuns}
                  available={true}
                />
                
                <MagicalFood
                  name="Time Salad"
                  description="Vegetables that seem to age and renew themselves"
                  effect="Brief glimpses into past and future events"
                  onConsume={handleConsumeTimeSalad}
                  available={true}
                />
                
                <MagicalFood
                  name="Quantum Soup"
                  description="Broth that exists in multiple states simultaneously"
                  effect="Reveals hidden connections between people and events"
                  onConsume={handleConsumeQuantumSoup}
                  available={isEastern}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                Students & Faculty
              </h2>
              
              <div className="space-y-3">
                {isEastern ? (
                  <>
                    <NPCInteraction
                      name="Alex Chen"
                      description="CS PhD student working on AI consciousness"
                      dialogue="I've been analyzing the patterns in this cafeteria's data flows. The network traffic here is... unusual. It's as if the building itself is processing information. Have you noticed how the WiFi signal strength changes based on what people are thinking about?"
                      mood="mysterious"
                      choices={[
                        {
                          text: "What kind of patterns?",
                          response: "Emotional resonance patterns. When someone has a breakthrough moment, the entire network responds. I think this place is more than just a cafeteria - it's a neural network made of human consciousness. Here, take this memory fragment I extracted from the data.",
                          action: handleMeetStudent
                        },
                        {
                          text: "That sounds impossible.",
                          response: "Impossible? We're at USTC - we specialize in making the impossible possible. The question isn't whether it's real, but whether you're ready to accept what you're seeing."
                        }
                      ]}
                    />
                    
                    <NPCInteraction
                      name="Sarah Liu"
                      description="Robotics student with glowing fingertips"
                      dialogue="My cybernetic implants are going crazy in here. They're detecting energy signatures that shouldn't exist. The food... it's not just food. It's encoded with information, memories, experiences."
                      mood="suspicious"
                      choices={[
                        {
                          text: "What do your implants detect?",
                          response: "Quantum entanglement signatures, temporal distortions, and something else... something that feels like consciousness itself. This place is a nexus point."
                        }
                      ]}
                    />
                  </>
                ) : (
                  <>
                    <NPCInteraction
                      name="Dr. Wang"
                      description="Quantum Physics professor with tired eyes"
                      dialogue="I've been conducting experiments here for months. The cafeteria sits on a unique convergence of ley lines - or what we in physics call 'dimensional membrane intersections.' The food here doesn't just nourish the body; it nourishes possibilities."
                      mood="helpful"
                      choices={[
                        {
                          text: "What kind of experiments?",
                          response: "Consciousness transfer, temporal observation, reality manipulation through quantum gastronomy. I know it sounds absurd, but the results are undeniable. The cafeteria is a laboratory disguised as a dining hall.",
                          action: handleMeetProfessor
                        },
                        {
                          text: "Is it safe to eat here?",
                          response: "Safe? That depends on your definition. The food won't harm you physically, but it might change how you perceive reality. Some students have reported... interesting side effects."
                        }
                      ]}
                    />
                    
                    <NPCInteraction
                      name="Maya Patel"
                      description="Mathematics student surrounded by floating equations"
                      dialogue="The mathematical constants here are all wrong. Pi isn't 3.14159... it's something else entirely. The geometry of this space doesn't follow Euclidean rules. I've been mapping the inconsistencies."
                      mood="mysterious"
                      choices={[
                        {
                          text: "Show me the equations.",
                          response: "Look around you - can't you see them? The equations are everywhere, written in steam, in the arrangement of tables, in the way light bends. This place is a living mathematical proof."
                        }
                      ]}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
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

export default DiningArea;