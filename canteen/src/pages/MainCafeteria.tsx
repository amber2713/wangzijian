import React, { useEffect } from 'react';
import { Coffee, Users, ChefHat, Eye, BookOpen } from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import InventoryPanel from '../components/InventoryPanel';
import AreaTransition from '../components/AreaTransition';
import NPCInteraction from '../components/NPCInteraction';

const MainCafeteria: React.FC = () => {
  const { state, dispatch } = useGame();

  useEffect(() => {
    dispatch({ type: 'CHANGE_LOCATION', payload: 'cafeteria' });
  }, [dispatch]);

  const handleMeetCafeteriaManager = () => {
    dispatch({ type: 'ADD_INVENTORY_ITEM', payload: "Professor's Notes" });
    dispatch({ type: 'UPDATE_NPC_RELATIONSHIP', payload: { npc: 'Manager Chen', change: 1 } });
  };

  const handleMeetMysteriousStudent = () => {
    dispatch({ type: 'ADD_INVENTORY_ITEM', payload: "Strange Key" });
    dispatch({ type: 'SET_STORY_FLAG', payload: { flag: 'metMysteriousStudent', value: true } });
  };

  return (
    <div className="min-h-screen p-6 cafeteria-bg-1">
      <div className="min-h-screen bg-overlay">
      <InventoryPanel />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 fade-in">
          <h1 className="text-4xl font-bold text-white mb-2">
            USTC Cafeteria - Main Hall
          </h1>
          <p className="text-purple-300 text-lg">
            Welcome, {state.playerName}. The air shimmers with possibility...
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="lg:w-2/3">
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 mb-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Coffee className="w-6 h-6 text-purple-400" />
                The Heart of USTC
              </h2>
              <p className="text-purple-200 leading-relaxed mb-4">
                The cafeteria buzzes with the energy of brilliant minds. Students from the School of 
                Computer Science discuss algorithms over steaming bowls, while Physics majors debate 
                quantum mechanics near the windows. But something feels... different today.
              </p>
              <p className="text-purple-200 leading-relaxed">
                The fluorescent lights flicker in patterns that seem almost intentional. The aroma 
                of food carries whispers of memories not your own. Welcome to a place where the 
                boundaries between the scientific and the supernatural blur.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AreaTransition
                to="/dining/east"
                title="Eastern Dining Area"
                description="Where Computer Science students gather. Strange algorithms seem to float in the air."
              />
              
              <AreaTransition
                to="/dining/west"
                title="Western Dining Area"
                description="Physics and Mathematics students debate reality itself here."
              />
              
              <AreaTransition
                to="/windows"
                title="Window Alcoves"
                description="Overlooking the campus. Some say you can see into other dimensions."
              />
              
              <AreaTransition
                to="/kitchen"
                title="Kitchen Entrance"
                description="The source of the magical aromas. Staff only... or is it?"
                requires={["Professor's Notes"]}
              />
              
              <AreaTransition
                to="/hidden-library"
                title="Hidden Archive"
                description="A secret collection of forbidden knowledge."
                requires={["Strange Key"]}
                hidden={true}
              />
            </div>
          </div>

          <div className="lg:w-1/3 flex flex-col">
            {/* 使用 sticky 定位确保 People of Interest 在展开时显示在顶部 */}
            <div className="sticky top-4 z-10 bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30 mb-4">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                People of Interest
              </h3>
              
              <div className="space-y-3">
                <NPCInteraction
                  name="Manager Chen"
                  description="Cafeteria supervisor with knowing eyes"
                  dialogue="Ah, a new student! Welcome to our cafeteria. I've been managing this place for twenty years, and I've seen... interesting things. The food here is special, you know. Some dishes can show you things that textbooks cannot."
                  mood="helpful"
                  choices={[
                    {
                      text: "What kind of special things?",
                      response: "Well, let's just say that our chef has a unique understanding of molecular gastronomy. Here, take these notes - they might help you understand what you're about to experience.",
                      action: handleMeetCafeteriaManager
                    },
                    {
                      text: "I'm just here for regular food.",
                      response: "Of course, of course. But keep your eyes open, young one. Sometimes the most extraordinary discoveries happen when we least expect them."
                    },
                    {
                      text: "Have you noticed anything strange lately?",
                      response: "Strange? In a university cafeteria? *chuckles* Everything here is strange if you know how to look. The question is: are you ready to see?"
                    }
                  ]}
                />

                <NPCInteraction
                  name="Lin Wei"
                  description="Mysterious third-year student"
                  dialogue="You're new here, aren't you? I can tell. There's something about this place that changes people. I've been studying the patterns, the connections. Want to know a secret? This cafeteria exists in more dimensions than the architects intended."
                  mood="mysterious"
                  choices={[
                    {
                      text: "What do you mean by dimensions?",
                      response: "Time, space, memory, dreams... they all converge here. I've been mapping the anomalies. Here, take this key. It opens doors that shouldn't exist. Use it wisely.",
                      action: handleMeetMysteriousStudent
                    },
                    {
                      text: "You sound crazy.",
                      response: "Crazy? Perhaps. But in a place where quantum physics students eat lunch next to computer scientists debugging reality itself, what is sanity? Look around with different eyes."
                    },
                    {
                      text: "Can you show me these patterns?",
                      response: "I can't show you directly - you must discover them yourself. But I can give you tools. The key I mentioned... it's yours if you're brave enough to use it."
                    }
                  ]}
                />
              </div>
            </div>

            {/* Observations 部分放在 People of Interest 下方，使用 margin-top: auto 推到右下角 */}
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30 mt-auto">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <Eye className="w-5 h-5 text-purple-400" />
                Observations
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-purple-200">
                  • The ceiling lights pulse in mathematical sequences
                </p>
                <p className="text-purple-200">
                  • Steam from the kitchen forms impossible shapes
                </p>
                <p className="text-purple-200">
                  • Some students seem to flicker between different versions of themselves
                </p>
                <p className="text-purple-200">
                  • The menu board displays dishes that don't exist... yet
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default MainCafeteria;