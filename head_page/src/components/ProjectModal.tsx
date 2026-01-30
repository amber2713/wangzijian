import React from 'react';
import { X, ExternalLink, Calendar } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto border border-gray-700">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-gray-700/50 backdrop-blur-sm rounded-full p-2 text-gray-400 hover:text-white hover:bg-gray-600/50 transition-all duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="aspect-video overflow-hidden rounded-t-2xl">
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop`;
            }}
          />
        </div>

        <div className="p-8">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-3xl font-bold text-white pr-4">
              {project.title}
            </h2>
          </div>

          <div className="flex items-center text-gray-400 text-sm mb-6">
            <Calendar className="w-4 h-4 mr-2" />
            <span>创建于 {new Date(project.createdAt).toLocaleDateString('zh-CN')}</span>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-3">项目简介</h3>
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {project.description}
            </p>
          </div>

          <div className="flex justify-end">
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              <ExternalLink className="w-4 h-4" />
              访问项目
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};