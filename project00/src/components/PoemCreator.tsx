import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { PenTool, Save } from 'lucide-react';

export default function PoemCreator() {
  const { state, dispatch } = useGame();
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreatePoem = () => {
    if (!title.trim() || !content.trim()) return;

    const newPoem = {
      id: `poem-${Date.now()}`,
      title: title.trim(),
      content: content.trim(),
      location: state.currentLocation
    };

    dispatch({ type: 'ADD_POEM', poem: newPoem });
    
    // Reset form
    setTitle('');
    setContent('');
    setIsCreating(false);

    // Increase progress for poetry creation
    const newProgress = Math.min(100, state.gameProgress + 15);
    dispatch({ type: 'UPDATE_PROGRESS', progress: newProgress });
  };

  if (!isCreating) {
    return (
      <button
        onClick={() => setIsCreating(true)}
        className={`w-full p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 ${
          state.language === 'zh' ? 'chinese-text' : 'english-text'
        }`}
      >
        <PenTool className="w-4 h-4" />
        {state.language === 'zh' ? '创作诗歌' : 'Create Poem'}
      </button>
    );
  }

  return (
    <div className="p-4 bg-purple-900/20 border border-purple-400/30 rounded-lg">
      <h4 className={`font-medium text-purple-200 mb-3 ${state.language === 'zh' ? 'chinese-text' : 'english-text'}`}>
        {state.language === 'zh' ? '诗歌创作' : 'Poem Creation'}
      </h4>
      
      <input
        type="text"
        placeholder={state.language === 'zh' ? '诗题' : 'Poem Title'}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={`w-full p-2 mb-3 bg-white/10 border border-white/20 rounded text-white placeholder-gray-400 ${
          state.language === 'zh' ? 'chinese-text' : 'english-text'
        }`}
      />
      
      <textarea
        placeholder={state.language === 'zh' ? '在此处写下你的诗句...' : 'Write your verses here...'}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        className={`w-full p-2 mb-3 bg-white/10 border border-white/20 rounded text-white placeholder-gray-400 resize-none ${
          state.language === 'zh' ? 'chinese-text' : 'english-text'
        }`}
      />
      
      <div className="flex gap-2">
        <button
          onClick={handleCreatePoem}
          disabled={!title.trim() || !content.trim()}
          className={`flex-1 py-2 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 ${
            state.language === 'zh' ? 'chinese-text' : 'english-text'
          }`}
        >
          <Save className="w-4 h-4" />
          {state.language === 'zh' ? '保存' : 'Save'}
        </button>
        <button
          onClick={() => setIsCreating(false)}
          className={`px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 ${
            state.language === 'zh' ? 'chinese-text' : 'english-text'
          }`}
        >
          {state.language === 'zh' ? '取消' : 'Cancel'}
        </button>
      </div>
    </div>
  );
}