import React from 'react';
import { useGame } from '../contexts/GameContext';
import AreaSelector from './AreaSelector';
import BilliardsRoom from './areas/BilliardsRoom';
import TableTennisArea from './areas/TableTennisArea';
import BadmintonArea from './areas/BadmintonArea';
import GymArea from './areas/GymArea';
import BoxingRoom from './areas/BoxingRoom';
import EntranceArea from './areas/EntranceArea';
import LanguageToggle from './LanguageToggle';
import ProgressTracker from './ProgressTracker';

interface StadiumExplorerProps {
  language: 'en' | 'zh';
  onLanguageChange: (lang: 'en' | 'zh') => void;
}

const StadiumExplorer: React.FC<StadiumExplorerProps> = ({ language, onLanguageChange }) => {
  const { gameState } = useGame();

  const renderCurrentArea = () => {
    switch (gameState.currentArea) {
      case 'entrance':
        return <EntranceArea language={language} />;
      case 'billiards':
        return <BilliardsRoom language={language} />;
      case 'tabletennis':
        return <TableTennisArea language={language} />;
      case 'badminton':
        return <BadmintonArea language={language} />;
      case 'gym':
        return <GymArea language={language} />;
      case 'boxing':
        return <BoxingRoom language={language} />;
      default:
        return <EntranceArea language={language} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-50 p-4 flex justify-between items-center">
        <ProgressTracker language={language} />
        <LanguageToggle language={language} onLanguageChange={onLanguageChange} />
      </div>

      {/* Area Selector */}
      <AreaSelector language={language} />

      {/* Current Area Content */}
      <div className="pt-20">
        {renderCurrentArea()}
      </div>
    </div>
  );
};

export default StadiumExplorer;