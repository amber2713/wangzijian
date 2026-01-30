import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'danger' | 'warning' | 'info';
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmText = '确认',
  cancelText = '取消',
  onConfirm,
  onCancel,
  type = 'danger'
}) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          icon: 'text-red-400',
          button: 'bg-red-600 hover:bg-red-700'
        };
      case 'warning':
        return {
          icon: 'text-yellow-400',
          button: 'bg-yellow-600 hover:bg-yellow-700'
        };
      default:
        return {
          icon: 'text-blue-400',
          button: 'bg-blue-600 hover:bg-blue-700'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onCancel}
      />
      
      <div className="relative bg-gray-800 rounded-2xl max-w-md w-full border border-gray-700">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-2 rounded-full bg-gray-700/50 ${styles.icon}`}>
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
          </div>
          
          <p className="text-gray-300 mb-6 leading-relaxed">
            {message}
          </p>
          
          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 text-white rounded-lg font-medium transition-colors duration-200 ${styles.button}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};