import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface GameState {
  currentLocation: string;
  visitedLocations: string[];
  inventory: string[];
  characters: Record<string, {
    met: boolean;
    friendship: number;
    conversations: string[];
  }>;
  poems: Array<{
    id: string;
    title: string;
    content: string;
    location: string;
  }>;
  discoveries: string[];
  gameProgress: number;
  language: 'zh' | 'en';
}

type GameAction = 
  | { type: 'MOVE_TO_LOCATION'; location: string }
  | { type: 'ADD_TO_INVENTORY'; item: string }
  | { type: 'MEET_CHARACTER'; character: string }
  | { type: 'ADD_POEM'; poem: GameState['poems'][0] }
  | { type: 'ADD_DISCOVERY'; discovery: string }
  | { type: 'UPDATE_PROGRESS'; progress: number }
  | { type: 'TOGGLE_LANGUAGE' }
  | { type: 'INCREASE_FRIENDSHIP'; character: string; amount: number };

const initialState: GameState = {
  currentLocation: 'dormitory-entrance',
  visitedLocations: ['dormitory-entrance'],
  inventory: [],
  characters: {
    'manager-liu': { met: false, friendship: 0, conversations: [] },
    'roommate-chen': { met: false, friendship: 0, conversations: [] },
    'scholar-wu': { met: false, friendship: 0, conversations: [] },
    'night-wanderer': { met: false, friendship: 0, conversations: [] }
  },
  poems: [],
  discoveries: [],
  gameProgress: 0,
  language: 'zh'
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'MOVE_TO_LOCATION':
      return {
        ...state,
        currentLocation: action.location,
        visitedLocations: state.visitedLocations.includes(action.location)
          ? state.visitedLocations
          : [...state.visitedLocations, action.location]
      };
    case 'ADD_TO_INVENTORY':
      return {
        ...state,
        inventory: [...state.inventory, action.item]
      };
    case 'MEET_CHARACTER':
      return {
        ...state,
        characters: {
          ...state.characters,
          [action.character]: {
            ...state.characters[action.character],
            met: true
          }
        }
      };
    case 'ADD_POEM':
      return {
        ...state,
        poems: [...state.poems, action.poem]
      };
    case 'ADD_DISCOVERY':
      return {
        ...state,
        discoveries: [...state.discoveries, action.discovery]
      };
    case 'UPDATE_PROGRESS':
      return {
        ...state,
        gameProgress: action.progress
      };
    case 'TOGGLE_LANGUAGE':
      return {
        ...state,
        language: state.language === 'zh' ? 'en' : 'zh'
      };
    case 'INCREASE_FRIENDSHIP':
      return {
        ...state,
        characters: {
          ...state.characters,
          [action.character]: {
            ...state.characters[action.character],
            friendship: Math.min(100, state.characters[action.character].friendship + action.amount)
          }
        }
      };
    default:
      return state;
  }
}

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}