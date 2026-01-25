import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Brain, Rewind, Play } from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import InventoryPanel from '../components/InventoryPanel';

const MemoryRealm: React.FC = () => {
  const { memory } = useParams<{ memory: string }>();
  const navigate = useNavigate();
  const { state, dispatch } = useGame();

  useEffect(() => {
    dispatch({ type: 'CHANGE_LOCATION', payload: `memory-${memory}` });
    dispatch({ type: 'ADD_MEMORY_FRAGMENT', payload: memory || 'unknown' });
  }, [memory, dispatch]);

  const getMemoryContent = () => {
    switch (memory) {
      case 'student-memories':
        return {
          title: "Echoes of Past Students",
          description: "You experience flashes of memories from students who ate here decades ago...",
          scenes: [
            {
              year: "1985",
              character: "Li Ming",
              memory: "A young engineering student discovers that the equations he's been working on are somehow encoded in the pattern of rice grains on his plate. This revelation leads to a breakthrough in quantum computing that won't be officially discovered for another 20 years."
            },
            {
              year: "1998",
              character: "Dr. Sarah Chen",
              memory: "A graduate student in theoretical physics realizes that the cafeteria exists in a state of quantum superposition. She documents her findings, but her notes disappear the next day, only to reappear in the hidden library."
            },
            {
              year: "2010",
              character: "Wang Xiaoli",
              memory: "A computer science student notices that the WiFi network in the cafeteria processes data in ways that shouldn't be possible. She traces the signals and discovers they're communicating with something beyond our dimension."
            }
          ]
        };
      default:
        return {
          title: "Unknown Memory",
          description: "The memory fragment is too damaged to fully reconstruct...",
          scenes: []
        };
    }
  };

  const memoryContent = getMemoryContent();

  const handleExitMemory = () => {
    dispatch({ type: 'DEACTIVATE_MAGICAL_EFFECT', payload: 'memory-vision' });
    dispatch({ type: 'COMPLETE_TASK', payload: 'experienced-memories' });
    navigate('/cafeteria');
  };

  return (
    <div className="min-h-screen p-6 memory-portal">
      <InventoryPanel />
      
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleExitMemory}
            className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Brain className="w-8 h-8 text-blue-400" />
              {memoryContent.title}
            </h1>
            <p className="text-blue-300">Experiencing memories through the Memories' Buns</p>
          </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30 mb-6">
          <p className="text-blue-200 text-lg leading-relaxed mb-6">
            {memoryContent.description}
          </p>

          <div className="space-y-6">
            {memoryContent.scenes.map((scene, index) => (
              <div key={index} className="bg-slate-900/50 rounded-lg p-6 border border-blue-500/20">
                <div className="flex items-center gap-3 mb-3">
                  <Rewind className="w-5 h-5 text-blue-400" />
                  <h3 className="text-white font-bold">{scene.year} - {scene.character}</h3>
                </div>
                <p className="text-blue-200 leading-relaxed">
                  {scene.memory}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleExitMemory}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg text-white font-medium transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            <Play className="w-4 h-4" />
            Return to Present
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemoryRealm;