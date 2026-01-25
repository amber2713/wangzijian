import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GameProvider } from './contexts/GameContext';
import StartScreen from './pages/StartScreen';
import MainCafeteria from './pages/MainCafeteria';
import DiningArea from './pages/DiningArea';
import Kitchen from './pages/Kitchen';
import WindowArea from './pages/WindowArea';
import HiddenLibrary from './pages/HiddenLibrary';
import MemoryRealm from './pages/MemoryRealm';
import TimeLoop from './pages/TimeLoop';
import SecretLab from './pages/SecretLab';
import FinalChamber from './pages/FinalChamber';
import './App.css';

function App() {
  return (
    <GameProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <Routes>
            <Route path="/" element={<StartScreen />} />
            <Route path="/cafeteria" element={<MainCafeteria />} />
            <Route path="/dining/:area" element={<DiningArea />} />
            <Route path="/kitchen" element={<Kitchen />} />
            <Route path="/windows" element={<WindowArea />} />
            <Route path="/hidden-library" element={<HiddenLibrary />} />
            <Route path="/memory-realm/:memory" element={<MemoryRealm />} />
            <Route path="/time-loop" element={<TimeLoop />} />
            <Route path="/secret-lab" element={<SecretLab />} />
            <Route path="/final-chamber" element={<FinalChamber />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;