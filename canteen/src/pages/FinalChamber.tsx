import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import InventoryPanel from '../components/InventoryPanel';

const FinalChamber: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useGame();

  useEffect(() => {
    dispatch({ type: 'CHANGE_LOCATION', payload: 'final-chamber' });
  }, [dispatch]);

  const handleEscape = () => {
    // Redirect to the specified URL
    window.location.href = 'https://jovial-naiad-a3ecb6.netlify.app/';
  };

  const handleStay = () => {
    dispatch({ type: 'SET_STORY_FLAG', payload: { flag: 'choseTranscendence', value: true } });
    // Could lead to a different ending or loop back to cafeteria with new powers
    navigate('/cafeteria');
  };

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <InventoryPanel />
      
      <div className="max-w-4xl w-full text-center">
        <div className="bg-gradient-to-br from-purple-900/80 to-pink-900/80 backdrop-blur-sm rounded-2xl p-8 border border-purple-400 glow">
          <div className="mb-6">
            <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h1 className="text-4xl font-bold magical-text mb-4">
              The Chamber of Choices
            </h1>
            <p className="text-purple-200 text-lg">
              Congratulations, {state.playerName}. You have reached the end of your journey.
            </p>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-6 mb-6 border border-purple-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">Your Journey's End</h2>
            <p className="text-purple-200 leading-relaxed mb-4">
              You have uncovered the truth about the USTC cafeteria: it is a nexus point where 
              consciousness, reality, and possibility converge. You have experienced memories 
              not your own, witnessed time bend to your will, and discovered that the boundaries 
              between science and magic are merely constructs of limited perception.
            </p>
            <p className="text-purple-200 leading-relaxed mb-4">
              The experiment is complete. You have been transformed from a simple student into 
              something more - a bridge between worlds, a keeper of impossible knowledge, 
              a guardian of the spaces between realities.
            </p>
            <p className="text-white font-semibold">
              Now you must choose your path forward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-800/60 rounded-xl p-6 border border-blue-500/30">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-blue-400" />
                Return to Reality
              </h3>
              <p className="text-blue-200 text-sm mb-4">
                Leave this magical realm behind and return to the ordinary world. Your memories 
                of this place will fade like a dream, but the wisdom you've gained will remain.
              </p>
              <button
                onClick={handleEscape}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-lg text-white font-medium transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                Exit to Reality
              </button>
            </div>

            <div className="bg-slate-800/60 rounded-xl p-6 border border-purple-500/30">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                Embrace Transcendence
              </h3>
              <p className="text-purple-200 text-sm mb-4">
                Remain in this realm of expanded consciousness. Become a guide for future students, 
                helping them discover their own potential for growth and transformation.
              </p>
              <button
                onClick={handleStay}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg text-white font-medium transition-all duration-300"
              >
                Stay and Transcend
              </button>
            </div>
          </div>

          <div className="bg-slate-800/40 rounded-lg p-4 border border-purple-500/20">
            <h4 className="text-white font-semibold mb-2">Your Achievements</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p className="text-purple-200">Areas Discovered: {state.discoveredAreas.length}</p>
              <p className="text-purple-200">Tasks Completed: {state.completedTasks.length}</p>
              <p className="text-purple-200">Memory Fragments: {state.memoryFragments.length}</p>
              <p className="text-purple-200">Time Loops: {state.timeLoopCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalChamber;