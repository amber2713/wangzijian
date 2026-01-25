import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { poemTemplates } from '../data/poemTemplates';
import { PenTool, Save, RefreshCw, Lightbulb } from 'lucide-react';

export default function EnhancedPoemCreator() {
  const { state, dispatch } = useGame();
  const [isCreating, setIsCreating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [title, setTitle] = useState('');
  const [lines, setLines] = useState<string[]>(['']);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

  const template = poemTemplates.find(t => t.id === selectedTemplate);

  const handleStartCreation = (templateId: string) => {
    setSelectedTemplate(templateId);
    setIsCreating(true);
    const selectedTemplate = poemTemplates.find(t => t.id === templateId);
    if (selectedTemplate) {
      setLines(new Array(selectedTemplate.structure.lines).fill(''));
    }
  };

  const handleLineChange = (index: number, value: string) => {
    const newLines = [...lines];
    newLines[index] = value;
    setLines(newLines);
  };

  const handleSavePoem = () => {
    if (!title.trim() || lines.some(line => !line.trim())) return;

    const newPoem = {
      id: `poem-${Date.now()}`,
      title: title.trim(),
      content: lines.join('\n'),
      location: state.currentLocation
    };

    dispatch({ type: 'ADD_POEM', poem: newPoem });
    
    // Reset form
    setTitle('');
    setLines(['']);
    setIsCreating(false);
    setSelectedTemplate('');
    setCurrentPromptIndex(0);

    // Increase progress for poetry creation
    const newProgress = Math.min(100, state.gameProgress + 15);
    dispatch({ type: 'UPDATE_PROGRESS', progress: newProgress });
  };

  const nextPrompt = () => {
    if (template && currentPromptIndex < template.prompts.zh.length - 1) {
      setCurrentPromptIndex(currentPromptIndex + 1);
    }
  };

  if (!isCreating) {
    return (
      <div>
        <h4 className={`font-medium text-purple-200 mb-3 ${state.language === 'zh' ? 'chinese-text' : 'english-text'}`}>
          {state.language === 'zh' ? '诗歌创作' : 'Poetry Creation'}
        </h4>
        
        <div className="space-y-2">
          {poemTemplates.map(template => (
            <button
              key={template.id}
              onClick={() => handleStartCreation(template.id)}
              className={`w-full p-3 text-left bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 ${
                state.language === 'zh' ? 'chinese-text' : 'english-text'
              }`}
            >
              <div className="flex items-center gap-2">
                <PenTool className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {state.language === 'zh' ? template.theme.zh : template.theme.en}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-purple-900/20 border border-purple-400/30 rounded-lg poetry-active">
      <div className="flex items-center justify-between mb-3">
        <h4 className={`font-medium text-purple-200 ${state.language === 'zh' ? 'chinese-text' : 'english-text'}`}>
          {state.language === 'zh' ? '创作中' : 'Creating'}
        </h4>
        <button
          onClick={() => setIsCreating(false)}
          className="text-purple-300 hover:text-purple-100 transition-colors"
        >
          ×
        </button>
      </div>

      {template && (
        <div className="mb-4 p-3 bg-purple-800/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-yellow-400" />
            <span className={`text-sm font-medium text-yellow-200 ${state.language === 'zh' ? 'chinese-text' : 'english-text'}`}>
              {state.language === 'zh' ? '灵感提示' : 'Inspiration'}
            </span>
          </div>
          <p className={`text-sm text-yellow-100 ${state.language === 'zh' ? 'chinese-text' : 'english-text'}`}>
            {state.language === 'zh' 
              ? template.prompts.zh[currentPromptIndex]
              : template.prompts.en[currentPromptIndex]
            }
          </p>
          {currentPromptIndex < template.prompts.zh.length - 1 && (
            <button
              onClick={nextPrompt}
              className="mt-2 text-xs text-yellow-300 hover:text-yellow-100 flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              {state.language === 'zh' ? '下一个提示' : 'Next prompt'}
            </button>
          )}
        </div>
      )}
      
      <input
        type="text"
        placeholder={state.language === 'zh' ? '诗题' : 'Poem Title'}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={`w-full p-2 mb-3 bg-white/10 border border-white/20 rounded text-white placeholder-gray-400 ${
          state.language === 'zh' ? 'chinese-text' : 'english-text'
        }`}
      />
      
      <div className="space-y-2 mb-3">
        {lines.map((line, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`${state.language === 'zh' ? '第' : 'Line'} ${index + 1} ${state.language === 'zh' ? '行' : ''}`}
              value={line}
              onChange={(e) => handleLineChange(index, e.target.value)}
              className={`w-full p-2 bg-white/10 border border-white/20 rounded text-white placeholder-gray-400 ${
                state.language === 'zh' ? 'chinese-text' : 'english-text'
              }`}
            />
            {template?.structure.syllablePattern && (
              <div className="text-xs text-purple-300 mt-1">
                {state.language === 'zh' 
                  ? `建议 ${template.structure.syllablePattern[index]} 个字符`
                  : `Suggested ${template.structure.syllablePattern[index]} syllables`
                }
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={handleSavePoem}
          disabled={!title.trim() || lines.some(line => !line.trim())}
          className={`flex-1 py-2 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 ${
            state.language === 'zh' ? 'chinese-text' : 'english-text'
          }`}
        >
          <Save className="w-4 h-4" />
          {state.language === 'zh' ? '保存诗歌' : 'Save Poem'}
        </button>
      </div>
    </div>
  );
}