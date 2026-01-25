import React from 'react';
import { useGame } from '../context/GameContext';
import { locations } from '../data/locations';
import InteractiveElement from './InteractiveElement';
import CharacterInteraction from './CharacterInteraction';

interface LocationRendererProps {
  location: string;
}

export default function LocationRenderer({ location }: LocationRendererProps) {
  const { state, dispatch } = useGame();
  const locationData = locations[location];

  if (!locationData) {
    return (
      <div className="text-white">
        <p>Location not found: {location}</p>
      </div>
    );
  }

  const handleLocationChange = (newLocation: string) => {
    dispatch({ type: 'MOVE_TO_LOCATION', location: newLocation });
  };

  const handleDiscovery = (discovery: string) => {
    dispatch({ type: 'ADD_DISCOVERY', discovery });
    // Update progress based on discoveries
    const newProgress = Math.min(100, state.gameProgress + 10);
    dispatch({ type: 'UPDATE_PROGRESS', progress: newProgress });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Location Header */}
      <div className="mb-8">
        <h2 className={`text-3xl font-bold text-white mb-4 ${state.language === 'zh' ? 'chinese-text' : 'english-text'}`}>
          {state.language === 'zh' ? locationData.name.zh : locationData.name.en}
        </h2>
        <div className={`text-lg text-blue-100 leading-relaxed ${state.language === 'zh' ? 'chinese-text' : 'english-text'}`}>
          {state.language === 'zh' ? locationData.description.zh : locationData.description.en}
        </div>
      </div>

      {/* Interactive Elements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {locationData.interactables.map((element, index) => (
          <InteractiveElement
            key={index}
            element={element}
            onDiscovery={handleDiscovery}
          />
        ))}
      </div>

      {/* Characters in this location */}
      {locationData.characters && locationData.characters.length > 0 && (
        <div className="mb-8">
          <h3 className={`text-xl font-semibold text-white mb-4 ${state.language === 'zh' ? 'chinese-text' : 'english-text'}`}>
            {state.language === 'zh' ? '人物' : 'Characters'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {locationData.characters.map((characterId, index) => (
              <CharacterInteraction key={index} characterId={characterId} />
            ))}
          </div>
        </div>
      )}

      {/* Navigation Options */}
      <div className="mt-8">
        <h3 className={`text-xl font-semibold text-white mb-4 ${state.language === 'zh' ? 'chinese-text' : 'english-text'}`}>
          {state.language === 'zh' ? '前往' : 'Go to'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {locationData.connections.map((connection, index) => (
            <button
              key={index}
              onClick={() => handleLocationChange(connection.to)}
              disabled={connection.requiresItem && !state.inventory.includes(connection.requiresItem)}
              className={`p-4 rounded-lg border border-white/20 transition-all duration-300 ${
                connection.requiresItem && !state.inventory.includes(connection.requiresItem)
                  ? 'bg-gray-700/50 text-gray-400 cursor-not-allowed'
                  : 'bg-white/10 hover:bg-white/20 text-white hover:scale-105'
              } ${state.language === 'zh' ? 'chinese-text' : 'english-text'}`}
            >
              <div className="text-sm opacity-75 mb-1">
                {state.language === 'zh' ? connection.name.zh : connection.name.en}
              </div>
              {connection.requiresItem && !state.inventory.includes(connection.requiresItem) && (
                <div className="text-xs text-red-300">
                  {state.language === 'zh' ? `需要: ${connection.requiresItem}` : `Requires: ${connection.requiresItem}`}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}