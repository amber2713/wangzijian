import React from 'react';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  language: 'en' | 'zh';
  onLanguageChange: (lang: 'en' | 'zh') => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ language, onLanguageChange }) => {
  return (
    <button
      onClick={() => onLanguageChange(language === 'en' ? 'zh' : 'en')}
      className="bg-black/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-black/50 transition-all duration-300 flex items-center gap-2"
    >
      <Globe className="w-4 h-4" />
      <span className="font-semibold">
        {language === 'en' ? '中文' : 'English'}
      </span>
    </button>
  );
};

export default LanguageToggle;