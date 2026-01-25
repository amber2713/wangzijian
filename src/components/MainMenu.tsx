import React, { useState } from 'react';
import { Play, Globe, BookOpen } from 'lucide-react';
import { translations } from '../data/translations';

interface MainMenuProps {
  onStart: () => void;
  language: 'en' | 'zh';
  onLanguageChange: (lang: 'en' | 'zh') => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStart, language, onLanguageChange }) => {
  const [showIntro, setShowIntro] = useState(false);
  const t = translations[language];

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1172849/pexels-photo-1172849.jpeg')] bg-cover bg-center opacity-20"></div>
      
      {/* Main Menu Content */}
      <div className="relative z-10 text-center text-white max-w-2xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-amber-300 bg-clip-text text-transparent">
            {t.gameTitle}
          </h1>
          <p className="text-xl text-blue-200 mb-8">{t.gameSubtitle}</p>
        </div>

        {!showIntro ? (
          <div className="space-y-6">
            <button
              onClick={() => setShowIntro(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center gap-3"
            >
              <Play className="w-6 h-6" />
              {t.startGame}
            </button>
            
            <button
              onClick={() => onLanguageChange(language === 'en' ? 'zh' : 'en')}
              className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
            >
              <Globe className="w-5 h-5" />
              {language === 'en' ? '中文' : 'English'}
            </button>

            <div className="text-sm text-blue-300 mt-8">
              <BookOpen className="w-4 h-4 inline mr-2" />
              {t.gameDescription}
            </div>
          </div>
        ) : (
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-8 space-y-6">
            <h2 className="text-2xl font-semibold text-amber-300 mb-4">{t.prologue.title}</h2>
            <div className="text-lg leading-relaxed space-y-4 text-blue-100">
              {t.prologue.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <button
              onClick={onStart}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              {t.enterStadium}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainMenu;