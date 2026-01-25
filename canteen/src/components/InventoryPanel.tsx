import React, { useState } from 'react';
import { Package, Sparkles, Clock, Brain, ChevronRight, ChevronLeft } from 'lucide-react';
import { useGame } from '../contexts/GameContext';

const InventoryPanel: React.FC = () => {
  const { state } = useGame();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getItemIcon = (item: string) => {
    if (item.includes('Memory')) return <Brain className="w-4 h-4" />;
    if (item.includes('Time')) return <Clock className="w-4 h-4" />;
    return <Sparkles className="w-4 h-4" />;
  };

  const getItemDescription = (item: string) => {
    const descriptions: Record<string, string> = {
      "Memories' Buns": "Allows you to experience others' memories",
      "Time Salad": "Grants brief glimpses into different time periods",
      "Quantum Soup": "Reveals hidden connections between people",
      "Reality Sandwich": "Shows the true nature of things",
      "Mystic Tea": "Enhances perception of magical energies",
      "Professor's Notes": "Cryptic research about the cafeteria's secrets",
      "Strange Key": "Opens doors that shouldn't exist",
      "Memory Fragment": "A piece of someone's forgotten past",
      "Temporal Coin": "Currency from a different timeline"
    };
    return descriptions[item] || "A mysterious item with unknown properties";
  };

  const togglePanel = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (state.inventory.length === 0) return null;

  return (
    <>
      {/* 折叠状态下的面板 */}
      {isCollapsed ? (
        <div 
          className="fixed top-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-2 z-50 cursor-pointer hover:bg-purple-900/70 transition-all duration-300"
          onClick={toggleCollapse}
        >
          <div className="flex items-center">
            <ChevronRight className="w-4 h-4 text-purple-400 mr-1" />
            <Package className="w-5 h-5 text-purple-400" />
          </div>
        </div>
      ) : (
        <div className="fixed top-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg z-50 transition-all duration-300">
          {/* 标题栏 - 始终显示 */}
          <div 
            className="flex items-center justify-between p-3 cursor-pointer border-b border-purple-500/30 hover:bg-purple-900/50 transition-colors"
            onClick={toggleCollapse}
          >
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-purple-400" />
              <h3 className="text-white font-semibold">Inventory</h3>
              <span className="text-purple-400 text-sm bg-purple-900/50 rounded-full px-2 py-0.5">
                {state.inventory.length}
              </span>
            </div>
            <ChevronLeft className="w-4 h-4 text-purple-400" />
          </div>
          
          {/* 展开/折叠按钮 */}
          <div 
            className="p-2 text-center cursor-pointer border-b border-purple-500/20 hover:bg-purple-900/40 transition-colors"
            onClick={togglePanel}
          >
            {isExpanded ? (
              <span className="text-purple-300 text-xs flex items-center justify-center">
                <ChevronLeft className="w-3 h-3 mr-1" /> Collapse
              </span>
            ) : (
              <span className="text-purple-300 text-xs flex items-center justify-center">
                <ChevronRight className="w-3 h-3 mr-1" /> Expand
              </span>
            )}
          </div>
          
          {/* 物品列表 - 根据展开状态显示 */}
          {isExpanded && (
            <div className="p-3 max-h-64 overflow-y-auto">
              <div className="space-y-2">
                {state.inventory.map((item, index) => (
                  <div 
                    key={index}
                    className="inventory-item bg-purple-900/50 rounded p-2 border border-purple-500/30"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {getItemIcon(item)}
                      <span className="text-purple-200 text-sm font-medium">{item}</span>
                    </div>
                    <p className="text-purple-300 text-xs">{getItemDescription(item)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default InventoryPanel;