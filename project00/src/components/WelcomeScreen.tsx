import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { BookOpen, Play } from 'lucide-react';

export default function WelcomeScreen() {
  const { state, dispatch } = useGame();
  const [showIntro, setShowIntro] = useState(true);

  const handleStartGame = () => {
    setShowIntro(false);
    dispatch({ type: 'MOVE_TO_LOCATION', location: 'dormitory-entrance' });
  };

  if (!showIntro) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto bg-gradient-to-br from-blue-900/80 to-purple-900/80 border border-white/20 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <BookOpen className="w-16 h-16 text-blue-300 mx-auto mb-4" />
          <h1 className={`text-4xl font-bold text-white mb-4 ${state.language === 'zh' ? 'chinese-text' : 'english-text'}`}>
            {state.language === 'zh' ? '科大宿舍奇遇记' : 'USTC Dormitory Adventures'}
          </h1>
          <p className={`text-lg text-blue-100 leading-relaxed ${state.language === 'zh' ? 'chinese-text' : 'english-text'}`}>
            {state.language === 'zh' 
              ? '欢迎来到中国科学技术大学中区宿舍。在这里，现实与幻想的边界变得模糊，每一个角落都可能隐藏着诗意和秘密。作为一名新生，你将踏上一段自我发现和精神升华的奇妙旅程。'
              : 'Welcome to the Central District Dormitory of the University of Science and Technology of China. Here, the boundaries between reality and fantasy blur, and every corner may hide poetry and secrets. As a freshman, you will embark on a wonderful journey of self-discovery and spiritual sublimation.'
            }
          </p>
        </div>

        <div className={`mb-8 p-6 bg-white/10 rounded-xl ${state.language === 'zh' ? 'chinese-text' : 'english-text'}`}>
          <h3 className="text-xl font-semibold text-white mb-4">
            {state.language === 'zh' ? '游戏说明' : 'Game Instructions'}
          </h3>
          <ul className="space-y-2 text-blue-100">
            <li>• {state.language === 'zh' ? '探索宿舍的各个角落，发现隐藏的秘密' : 'Explore every corner of the dormitory to discover hidden secrets'}</li>
            <li>• {state.language === 'zh' ? '与不同的人物对话，建立友谊' : 'Converse with different characters and build friendships'}</li>
            <li>• {state.language === 'zh' ? '创作诗歌，表达内心的感受' : 'Create poetry to express your inner feelings'}</li>
            <li>• {state.language === 'zh' ? '解开谜题，获得特殊物品' : 'Solve puzzles to obtain special items'}</li>
            <li>• {state.language === 'zh' ? '寻找现实与幻想的交汇点' : 'Find the intersection of reality and fantasy'}</li>
          </ul>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => dispatch({ type: 'TOGGLE_LANGUAGE' })}
            className={`px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg transition-all duration-200 ${
              state.language === 'zh' ? 'chinese-text' : 'english-text'
            }`}
          >
            {state.language === 'zh' ? 'English' : '中文'}
          </button>
          <button
            onClick={handleStartGame}
            className={`px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 flex items-center gap-2 ${
              state.language === 'zh' ? 'chinese-text' : 'english-text'
            }`}
          >
            <Play className="w-5 h-5" />
            {state.language === 'zh' ? '开始游戏' : 'Start Game'}
          </button>
        </div>
      </div>
    </div>
  );
}