import React, { useState, useEffect } from 'react';
import { GameProvider } from './contexts/GameContext';
import MainMenu from './components/MainMenu';
import StadiumExplorer from './components/StadiumExplorer';
import './styles/fonts.css';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'zh'>('en');

  useEffect(() => {
    // Set document font based on language
    document.documentElement.style.fontFamily = currentLanguage === 'zh' 
      ? "'KaiTi', '楷体', serif" 
      : "'Cambria', 'Times New Roman', serif";
  }, [currentLanguage]);

  return (
    <GameProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        {!gameStarted ? (
          <MainMenu 
            onStart={() => setGameStarted(true)}
            language={currentLanguage}
            onLanguageChange={setCurrentLanguage}
          />
        ) : (
          <StadiumExplorer 
            language={currentLanguage}
            onLanguageChange={setCurrentLanguage}
          />
        )}
      </div>
    </GameProvider>
  );
}

export default App;