import React, { useState, useEffect } from 'react';
import { poemDatabase } from '../data/poems';
import { X, BookOpen, Sparkles } from 'lucide-react';

interface PoemCreatorProps {
  poemId: string;
  language: 'en' | 'zh';
  onClose: () => void;
  title: string;
  theme: string;
}

const PoemCreator: React.FC<PoemCreatorProps> = ({ 
  poemId, 
  language, 
  onClose, 
  title, 
  theme 
}) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [showFullPoem, setShowFullPoem] = useState(false);

  const poem = poemDatabase[poemId]?.[language];

  useEffect(() => {
    if (!poem) return;

    const currentLine = poem.lines[currentLineIndex];
    if (!currentLine) {
      setShowFullPoem(true);
      return;
    }

    let charIndex = 0;
    const interval = setInterval(() => {
      if (charIndex <= currentLine.length) {
        setDisplayedText(currentLine.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
          setDisplayedText('');
        }, 1000);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [currentLineIndex, poem]);

  if (!poem) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl max-w-2xl w-full p-8 border border-amber-500/30 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-amber-300 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="min-h-48 flex items-center justify-center">
          {!showFullPoem ? (
            <div className="text-center">
              <div className="text-2xl text-white mb-4 min-h-16 flex items-center justify-center">
                {displayedText}
                <span className="animate-pulse ml-1">|</span>
              </div>
              <Sparkles className="w-8 h-8 text-amber-400 mx-auto animate-spin" />
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="space-y-2">
                {poem.lines.map((line, index) => (
                  <p key={index} className="text-xl text-white leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
              <div className="text-amber-300 text-lg font-semibold mt-6">
                — {poem.author}
              </div>
              <div className="text-gray-400 text-sm italic">
                {poem.inspiration}
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-6">
          <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
            theme === 'strategy' ? 'bg-green-500/20 text-green-300' :
            theme === 'flow' ? 'bg-blue-500/20 text-blue-300' :
            theme === 'grace' ? 'bg-purple-500/20 text-purple-300' :
            theme === 'strength' ? 'bg-red-500/20 text-red-300' :
            'bg-yellow-500/20 text-yellow-300'
          }`}>
            {theme.charAt(0).toUpperCase() + theme.slice(1)} Theme
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoemCreator;