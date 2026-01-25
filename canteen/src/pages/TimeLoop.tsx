import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, RotateCcw, FastForward } from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import InventoryPanel from '../components/InventoryPanel';

const TimeLoop: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useGame();

  useEffect(() => {
    dispatch({ type: 'CHANGE_LOCATION', payload: 'time-loop' });
    dispatch({ type: 'INCREMENT_TIME_LOOP' });
  }, [dispatch]); // 依赖数组中移除 state.timeLoopCount，避免无限循环

  const timeEvents = [
    {
      time: "12:00 PM",
      event: "A student spills soup, but the liquid flows upward back into the bowl",
      significance: "Time reversal anomaly detected"
    },
    {
      time: "12:15 PM", 
      event: "The same conversation happens at three different tables simultaneously",
      significance: "Temporal echo phenomenon"
    },
    {
      time: "12:30 PM",
      event: "A professor walks through the same door multiple times, each time slightly different",
      significance: "Parallel timeline convergence"
    },
    {
      time: "12:45 PM",
      event: "The clock on the wall runs backward for exactly 3 minutes and 14 seconds",
      significance: "Pi-related temporal distortion"
    }
  ];

  const handleBreakLoop = () => {
    dispatch({ type: 'DEACTIVATE_MAGICAL_EFFECT', payload: 'temporal-sight' });
    dispatch({ type: 'COMPLETE_TASK', payload: 'escaped-time-loop' });
    dispatch({ type: 'ADD_MEMORY_FRAGMENT', payload: 'temporal-mastery' });
    navigate('/cafeteria');
  };

  const handleRepeatLoop = () => {
    dispatch({ type: 'INCREMENT_TIME_LOOP' }); // 只分发增加循环次数的动作，全局状态更新后会重新渲染
  };

  return (
    <div className="min-h-screen p-6 time-distortion">
      <InventoryPanel />
      
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleBreakLoop}
            className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Clock className="w-8 h-8 text-green-400" />
              Temporal Loop #{state.timeLoopCount} 
            </h1>
            <p className="text-green-300">Caught in the Time Salad's effect</p>
          </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-green-500/30 mb-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-green-400" />
            Temporal Observations
          </h2>
          <p className="text-green-200 leading-relaxed mb-6">
            The Time Salad has granted you the ability to perceive temporal anomalies. You're 
            experiencing the same hour over and over, but each loop reveals new details about 
            the cafeteria's true nature. Pay attention to the patterns...
          </p>

          <div className="space-y-4">
            {timeEvents.map((event, index) => (
              <div key={index} className="bg-slate-900/50 rounded-lg p-4 border border-green-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-green-400 font-semibold">{event.time}</span>
                  <span className="text-green-300 text-sm">{event.significance}</span>
                </div>
                <p className="text-green-200">{event.event}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-green-500/30 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Loop Analysis</h2>
          <p className="text-green-200 mb-4">
            Loop #{state.timeLoopCount}: You're beginning to understand the pattern. Each repetition 
            reveals more about the cafeteria's temporal structure. The key to breaking free 
            lies in accepting what you've learned rather than fighting against it.
          </p>
          
          {state.timeLoopCount >= 3 && ( // 使用全局状态判断
            <div className="p-4 bg-green-900/30 rounded-lg border border-green-500/20">
              <p className="text-green-200 font-semibold">
                Revelation: The time loop isn't a trap - it's a teaching tool. You now understand 
                that time in this place is fluid, malleable. This knowledge will serve you well 
                in the challenges ahead.
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleRepeatLoop}
            className="px-6 py-3 bg-green-700 hover:bg-green-600 rounded-lg text-white transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Experience Loop Again
          </button>
          
          {state.timeLoopCount >= 2 && ( // 使用全局状态判断
            <button
              onClick={handleBreakLoop}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 rounded-lg text-white font-medium transition-all duration-300 flex items-center gap-2"
            >
              <FastForward className="w-4 h-4" />
              Break Free from Loop
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeLoop;