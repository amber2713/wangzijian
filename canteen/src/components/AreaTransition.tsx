import React from 'react';
import { ArrowRight, Lock, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';

interface AreaTransitionProps {
  to: string;
  title: string;
  description: string;
  requires?: string[];
  hidden?: boolean;
  onTransition?: () => void;
}

const AreaTransition: React.FC<AreaTransitionProps> = ({
  to,
  title,
  description,
  requires = [],
  hidden = false,
  onTransition
}) => {
  const navigate = useNavigate();
  const { state, dispatch } = useGame();

  const canAccess = requires.every(req => 
    state.inventory.includes(req) || 
    state.completedTasks.includes(req) ||
    state.discoveredAreas.includes(req)
  );

  const handleTransition = () => {
    if (!canAccess) return;
    
    if (onTransition) {
      onTransition();
    }
    
    dispatch({ type: 'DISCOVER_AREA', payload: to });
    dispatch({ type: 'CHANGE_LOCATION', payload: to });
    navigate(to);
  };

  if (hidden && !canAccess) return null;

  return (
    <div 
      className={`bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border transition-all duration-300 ${
        canAccess 
          ? 'border-purple-500/50 hover:border-purple-400 hover-lift cursor-pointer' 
          : 'border-red-500/50 cursor-not-allowed'
      }`}
      onClick={handleTransition}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {!canAccess && <Lock className="w-4 h-4 text-red-400" />}
            {hidden && canAccess && <Eye className="w-4 h-4 text-purple-400" />}
            <h4 className={`font-semibold ${canAccess ? 'text-white' : 'text-red-300'}`}>
              {title}
            </h4>
          </div>
          <p className={`text-sm ${canAccess ? 'text-purple-200' : 'text-red-200'}`}>
            {description}
          </p>
          {!canAccess && requires.length > 0 && (
            <p className="text-red-400 text-xs mt-1">
              Requires: {requires.join(', ')}
            </p>
          )}
        </div>
        {canAccess && (
          <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
        )}
      </div>
    </div>
  );
};

export default AreaTransition;