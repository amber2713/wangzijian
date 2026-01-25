import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { translations } from '../data/translations';
import { 
  Home, 
  Circle, 
  Zap, 
  Activity, 
  Dumbbell, 
  Target,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface AreaSelectorProps {
  language: 'en' | 'zh';
}

const AreaSelector: React.FC<AreaSelectorProps> = ({ language }) => {
  const { gameState, visitArea } = useGame();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const t = translations[language];

  const areas = [
    { id: 'entrance', name: t.areas.entrance, icon: Home, color: 'from-blue-500 to-blue-700' },
    { id: 'billiards', name: t.areas.billiards, icon: Circle, color: 'from-green-500 to-green-700' },
    { id: 'tabletennis', name: t.areas.tabletennis, icon: Zap, color: 'from-orange-500 to-orange-700' },
    { id: 'badminton', name: t.areas.badminton, icon: Activity, color: 'from-purple-500 to-purple-700' },
    { id: 'gym', name: t.areas.gym, icon: Dumbbell, color: 'from-red-500 to-red-700' },
    { id: 'boxing', name: t.areas.boxing, icon: Target, color: 'from-yellow-500 to-yellow-700' }
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`fixed left-4 top-1/2 transform -translate-y-1/2 z-40 transition-all duration-300 ${isCollapsed ? 'w-16' : ''}`}>
      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 space-y-3 relative">
        {/* 折叠/展开按钮 */}
        <button
          onClick={toggleCollapse}
          className="absolute -right-2 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-600 rounded-full p-1 z-50 transition-colors"
          title={isCollapsed ? t.expand || 'Expand' : t.collapse || 'Collapse'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-white" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-white" />
          )}
        </button>

        {areas.map((area) => {
          const Icon = area.icon;
          const isCurrentArea = gameState.currentArea === area.id;
          const isVisited = gameState.visitedAreas.includes(area.id);
          const isLocked = area.id !== 'entrance' && gameState.storyProgress < 1 && !isVisited;

          return (
            <button
              key={area.id}
              onClick={() => !isLocked && visitArea(area.id)}
              disabled={isLocked}
              className={`
                w-16 h-16 rounded-lg transition-all duration-300 relative group
                ${isCurrentArea 
                  ? `bg-gradient-to-br ${area.color} scale-110 shadow-lg` 
                  : isLocked 
                    ? 'bg-gray-600 opacity-50 cursor-not-allowed'
                    : `bg-gradient-to-br ${area.color} opacity-70 hover:opacity-100 hover:scale-105`
                }
                ${isCollapsed ? 'opacity-0 pointer-events-none absolute' : 'opacity-100'}
              `}
              title={area.name}
            >
              <Icon 
                className={`w-8 h-8 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
                  isLocked ? 'opacity-50' : ''
                }`} 
              />
              {isVisited && !isCurrentArea && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-white"></div>
              )}
              {isLocked && (
                <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
              )}
              
              {/* Tooltip */}
              <div className="absolute left-20 top-1/2 transform -translate-y-1/2 bg-black/80 text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                {area.name}
              </div>
            </button>
          );
        })}

        {/* 折叠状态下的简化视图 */}
        {isCollapsed && (
          <div className="space-y-2">
            {areas.map((area) => {
              const Icon = area.icon;
              const isCurrentArea = gameState.currentArea === area.id;
              const isVisited = gameState.visitedAreas.includes(area.id);
              const isLocked = area.id !== 'entrance' && gameState.storyProgress < 1 && !isVisited;

              return (
                <button
                  key={area.id}
                  onClick={() => !isLocked && visitArea(area.id)}
                  disabled={isLocked}
                  className={`
                    w-8 h-8 rounded-lg transition-all duration-300 relative group
                    ${isCurrentArea 
                      ? `bg-gradient-to-br ${area.color} scale-110 shadow-lg` 
                      : isLocked 
                        ? 'bg-gray-600 opacity-50 cursor-not-allowed'
                        : `bg-gradient-to-br ${area.color} opacity-70 hover:opacity-100 hover:scale-105`
                    }
                  `}
                  title={area.name}
                >
                  <Icon 
                    className={`w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
                      isLocked ? 'opacity-50' : ''
                    }`} 
                  />
                  {isVisited && !isCurrentArea && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full border border-white"></div>
                  )}
                  {isLocked && (
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                    </div>
                  )}
                  
                  {/* Tooltip */}
                  <div className="absolute left-10 top-1/2 transform -translate-y-1/2 bg-black/80 text-white px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none text-xs">
                    {area.name}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AreaSelector;