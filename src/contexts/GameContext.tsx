import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface GameState {
  playerName: string;
  currentArea: string;
  visitedAreas: string[];
  unlockedPoems: string[];
  discoveredClues: string[];
  npcInteractions: Record<string, boolean>;
  storyProgress: number;
  hasEscapeKey: boolean;
}

interface GameContextType {
  gameState: GameState;
  updateGameState: (updates: Partial<GameState>) => void;
  addPoem: (poemId: string) => void;
  addClue: (clueId: string) => void;
  visitArea: (area: string) => void;
  interactWithNPC: (npcId: string) => void;
  progressStory: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({
    playerName: '',
    currentArea: 'entrance',
    visitedAreas: ['entrance'],
    unlockedPoems: [],
    discoveredClues: [],
    npcInteractions: {},
    storyProgress: 0,
    hasEscapeKey: false
  });

  const updateGameState = (updates: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...updates }));
  };

  const addPoem = (poemId: string) => {
    setGameState(prev => ({
      ...prev,
      unlockedPoems: [...prev.unlockedPoems, poemId]
    }));
  };

  const addClue = (clueId: string) => {
    setGameState(prev => ({
      ...prev,
      discoveredClues: [...prev.discoveredClues, clueId]
    }));
  };

  const visitArea = (area: string) => {
    setGameState(prev => ({
      ...prev,
      currentArea: area,
      visitedAreas: prev.visitedAreas.includes(area) 
        ? prev.visitedAreas 
        : [...prev.visitedAreas, area]
    }));
  };

  const interactWithNPC = (npcId: string) => {
    setGameState(prev => ({
      ...prev,
      npcInteractions: { ...prev.npcInteractions, [npcId]: true }
    }));
  };

  const progressStory = () => {
    setGameState(prev => ({
      ...prev,
      storyProgress: prev.storyProgress + 1
    }));
  };

  return (
    <GameContext.Provider value={{
      gameState,
      updateGameState,
      addPoem,
      addClue,
      visitArea,
      interactWithNPC,
      progressStory
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};