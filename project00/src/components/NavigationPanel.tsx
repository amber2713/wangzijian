import React from 'react';
import { useGame } from '../context/GameContext';
import { MapPin, CheckCircle } from 'lucide-react';

export default function NavigationPanel() {
  const { state } = useGame();

  const allLocations = [
    { id: 'dormitory-entrance', name: { zh: '宿舍大门', en: 'Dormitory Entrance' } },
    { id: 'hallway-first-floor', name: { zh: '一楼走廊', en: 'First Floor Hallway' } },
    { id: 'room-204', name: { zh: '204室', en: 'Room 204' } },
    { id: 'study-room', name: { zh: '自习室', en: 'Study Room' } },
    { id: 'rooftop-garden', name: { zh: '天台花园', en: 'Rooftop Garden' } },
    { id: 'basement-archives', name: { zh: '地下档案室', en: 'Basement Archives' } },
    { id: 'hidden-passage', name: { zh: '隐秘通道', en: 'Hidden Passage' } }
  ];

  return (
    <div>
      <h3 className={`text-lg font-semibold text-white mb-4 ${state.language === 'zh' ? 'chinese-text' : 'english-text'}`}>
        {state.language === 'zh' ? '位置' : 'Locations'}
      </h3>
      
      <div className="space-y-2">
        {allLocations.map(location => {
          const isVisited = state.visitedLocations.includes(location.id);
          const isCurrent = state.currentLocation === location.id;
          
          return (
            <div
              key={location.id}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                isCurrent 
                  ? 'bg-blue-600/50 border border-blue-400/50' 
                  : isVisited 
                    ? 'bg-white/10 border border-white/20' 
                    : 'bg-gray-700/30 border border-gray-600/30'
              }`}
            >
              {isVisited ? (
                <CheckCircle className={`w-4 h-4 ${isCurrent ? 'text-blue-300' : 'text-green-400'}`} />
              ) : (
                <MapPin className="w-4 h-4 text-gray-500" />
              )}
              <span className={`text-sm ${
                isCurrent ? 'text-blue-200 font-medium' : isVisited ? 'text-white' : 'text-gray-400'
              } ${state.language === 'zh' ? 'chinese-text' : 'english-text'}`}>
                {state.language === 'zh' ? location.name.zh : location.name.en}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}