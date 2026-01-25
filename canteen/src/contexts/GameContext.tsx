import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface GameState {
  playerName: string;
  currentLocation: string;
  inventory: string[];
  discoveredAreas: string[];
  completedTasks: string[];
  npcRelationships: Record<string, number>;
  magicalEffectsActive: string[];
  timeLoopCount: number;
  memoryFragments: string[];
  escapeRouteUnlocked: boolean;
  storyFlags: Record<string, boolean>;
}

type GameAction = 
  | { type: 'SET_PLAYER_NAME'; payload: string }
  | { type: 'CHANGE_LOCATION'; payload: string }
  | { type: 'ADD_INVENTORY_ITEM'; payload: string }
  | { type: 'REMOVE_INVENTORY_ITEM'; payload: string }
  | { type: 'DISCOVER_AREA'; payload: string }
  | { type: 'COMPLETE_TASK'; payload: string }
  | { type: 'UPDATE_NPC_RELATIONSHIP'; payload: { npc: string; change: number } }
  | { type: 'ACTIVATE_MAGICAL_EFFECT'; payload: string }
  | { type: 'DEACTIVATE_MAGICAL_EFFECT'; payload: string }
  | { type: 'INCREMENT_TIME_LOOP' }
  | { type: 'ADD_MEMORY_FRAGMENT'; payload: string }
  | { type: 'UNLOCK_ESCAPE_ROUTE' }
  | { type: 'SET_STORY_FLAG'; payload: { flag: string; value: boolean } };

const initialState: GameState = {
  playerName: '',
  currentLocation: 'start',
  inventory: [],
  discoveredAreas: ['cafeteria'],
  completedTasks: [],
  npcRelationships: {},
  magicalEffectsActive: [],
  timeLoopCount: 0,
  memoryFragments: [],
  escapeRouteUnlocked: false,
  storyFlags: {}
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_PLAYER_NAME':
      return { ...state, playerName: action.payload };
    case 'CHANGE_LOCATION':
      return { ...state, currentLocation: action.payload };
    case 'ADD_INVENTORY_ITEM':
      return { 
        ...state, 
        inventory: [...state.inventory, action.payload] 
      };
    case 'REMOVE_INVENTORY_ITEM':
      return { 
        ...state, 
        inventory: state.inventory.filter(item => item !== action.payload) 
      };
    case 'DISCOVER_AREA':
      return { 
        ...state, 
        discoveredAreas: [...new Set([...state.discoveredAreas, action.payload])] 
      };
    case 'COMPLETE_TASK':
      return { 
        ...state, 
        completedTasks: [...state.completedTasks, action.payload] 
      };
    case 'UPDATE_NPC_RELATIONSHIP':
      return {
        ...state,
        npcRelationships: {
          ...state.npcRelationships,
          [action.payload.npc]: (state.npcRelationships[action.payload.npc] || 0) + action.payload.change
        }
      };
    case 'ACTIVATE_MAGICAL_EFFECT':
      return {
        ...state,
        magicalEffectsActive: [...new Set([...state.magicalEffectsActive, action.payload])]
      };
    case 'DEACTIVATE_MAGICAL_EFFECT':
      return {
        ...state,
        magicalEffectsActive: state.magicalEffectsActive.filter(effect => effect !== action.payload)
      };
    case 'INCREMENT_TIME_LOOP':
      return { ...state, timeLoopCount: state.timeLoopCount + 1 };
    case 'ADD_MEMORY_FRAGMENT':
      return {
        ...state,
        memoryFragments: [...new Set([...state.memoryFragments, action.payload])]
      };
    case 'UNLOCK_ESCAPE_ROUTE':
      return { ...state, escapeRouteUnlocked: true };
    case 'SET_STORY_FLAG':
      return {
        ...state,
        storyFlags: { ...state.storyFlags, [action.payload.flag]: action.payload.value }
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