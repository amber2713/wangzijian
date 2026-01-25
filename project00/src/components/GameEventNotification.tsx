import React, { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import { checkGameEvents } from '../data/gameEvents';
import { Sparkles } from 'lucide-react';

export default function GameEventNotification() {
  const { state } = useGame();
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const triggeredEvents = checkGameEvents(state);
    if (triggeredEvents.length > 0) {
      const newNotifications = triggeredEvents.map(event => 
        state.language === 'zh' ? event.description.zh : event.description.en
      );
      setNotifications(prev => [...prev, ...newNotifications]);

      // Clear notifications after 5 seconds
      setTimeout(() => {
        setNotifications(prev => prev.slice(newNotifications.length));
      }, 5000);
    }
  }, [state]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification, index) => (
        <div
          key={index}
          className={`max-w-sm p-4 bg-purple-900/90 border border-purple-400/50 rounded-lg shadow-xl fade-in-up ${
            state.language === 'zh' ? 'chinese-text' : 'english-text'
          }`}
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-purple-300" />
            <p className="text-sm text-purple-100">{notification}</p>
          </div>
        </div>
      ))}
    </div>
  );
}