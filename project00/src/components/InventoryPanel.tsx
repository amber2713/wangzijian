import React from 'react';
import { useGame } from '../context/GameContext';
import { Package, BookOpen, Sparkles } from 'lucide-react';
import EnhancedPoemCreator from './EnhancedPoemCreator';

export default function InventoryPanel() {
  const { state } = useGame();

  return (
    <div>
      {/* Inventory Section */}
      <h3 className={`text-lg font-semibold text-white mb-4 ${state.language === 'zh' ? 'chinese-text' : 'english-text'}`}>
        {state.language === 'zh' ? '物品' : 'Inventory'}
      </h3>
      
      <div className="space-y-2 mb-6">
        {state.inventory.length === 0 ? (
          <p className={`text-sm text-gray-400 ${state.language === 'zh' ? 'chinese-text' : 'english-text'}`}>
            {state.language === 'zh' ? '空' : 'Empty'}
          </p>
        ) : (
          state.inventory.map((item, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-white/10 rounded-lg">
              <Package className="w-4 h-4 text-yellow-400" />
              <span className={`text-sm text-white ${state.language === 'zh' ? 'chinese-text' : 'english-text'}`}>
                {item}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Poems Section */}
      <h3 className={`text-lg font-semibold text-white mb-4 ${state.language === 'zh' ? 'chinese-text' : 'english-text'}`}>
        {state.language === 'zh' ? '诗集' : 'Poems'}
      </h3>
      
      <div className="space-y-3 mb-6 max-h-40 overflow-y-auto">
        {state.poems.map((poem, index) => (
          <div key={index} className="p-3 bg-purple-900/30 border border-purple-400/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-purple-300" />
              <span className={`text-sm font-medium text-purple-200 ${state.language === 'zh' ? 'chinese-text' : 'english-text'}`}>
                {poem.title}
              </span>
            </div>
            <p className={`text-xs text-purple-100 leading-relaxed ${state.language === 'zh' ? 'chinese-text' : 'english-text'}`}>
              {poem.content.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < poem.content.split('\n').length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>

      {/* Enhanced Poem Creator */}
      <EnhancedPoemCreator />

      {/* Discoveries Section */}
      <h3 className={`text-lg font-semibold text-white mb-4 mt-6 ${state.language === 'zh' ? 'chinese-text' : 'english-text'}`}>
        {state.language === 'zh' ? '发现' : 'Discoveries'}
      </h3>
      
      <div className="space-y-2 max-h-32 overflow-y-auto">
        {state.discoveries.map((discovery, index) => (
          <div key={index} className="flex items-center gap-2 p-2 bg-green-900/30 border border-green-400/30 rounded-lg">
            <Sparkles className="w-4 h-4 text-green-400" />
            <span className={`text-sm text-green-200 ${state.language === 'zh' ? 'chinese-text' : 'english-text'}`}>
              {discovery}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}