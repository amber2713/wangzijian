import React from 'react';
import { useGame } from '../context/GameContext';
import LocationRenderer from './LocationRenderer';
import NavigationPanel from './NavigationPanel';
import InventoryPanel from './InventoryPanel';
import LanguageToggle from './LanguageToggle';
import ProgressBar from './ProgressBar';
import WelcomeScreen from './WelcomeScreen';
import GameEventNotification from './GameEventNotification';

export default function GameContainer() {
  const { state } = useGame();

  return (
    <div className="min-h-screen flex flex-col">
      <WelcomeScreen />
      <GameEventNotification />
      
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className={`text-2xl font-semibold text-white ${state.language === 'zh' ? 'chinese-text' : 'english-text'}`}>
            {state.language === 'zh' ? '科大宿舍奇遇记' : 'USTC Dormitory Adventures'}
          </h1>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <ProgressBar />
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-64 bg-black/10 backdrop-blur-sm border-b lg:border-b-0 lg:border-r border-white/10 p-4">
          <NavigationPanel />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <LocationRenderer location={state.currentLocation} />
        </main>

        {/* Inventory Sidebar */}
        <aside className="w-full lg:w-64 bg-black/10 backdrop-blur-sm border-t lg:border-t-0 lg:border-l border-white/10 p-4">
          <InventoryPanel />
        </aside>
      </div>
    </div>
  );
}