import React from 'react';
import { ExternalLink, CreditCard as Edit, Trash2 } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, onEdit, onDelete }) => {
  return (
    <div 
      className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-gray-800/70 border border-gray-700/50 hover:border-gray-600"
      onClick={onClick}
    >
      <div className="aspect-video overflow-hidden">
        <img 
          src={project.imageUrl} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
        <button
          onClick={onEdit}
          className="bg-green-500/20 backdrop-blur-sm rounded-full p-2 border border-green-400/30 hover:bg-green-500/30 transition-colors duration-200"
          title="编辑项目"
        >
          <Edit className="w-4 h-4 text-green-400" />
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500/20 backdrop-blur-sm rounded-full p-2 border border-red-400/30 hover:bg-red-500/30 transition-colors duration-200"
          title="删除项目"
        >
          <Trash2 className="w-4 h-4 text-red-400" />
        </button>
        <div className="bg-blue-500/20 backdrop-blur-sm rounded-full p-2 border border-blue-400/30">
          <ExternalLink className="w-4 h-4 text-blue-400" />
        </div>
      </div>
    </div>
  );
};