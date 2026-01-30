import React, { useState } from 'react';
import { Plus, BookOpen, Sparkles } from 'lucide-react';
import { ProjectCard } from './components/ProjectCard';
import { ProjectModal } from './components/ProjectModal';
import { AddProjectModal } from './components/AddProjectModal';
import { ConfirmDialog } from './components/ConfirmDialog';
import { useProjects } from './hooks/useProjects';
import { Project } from './types';

function App() {
  const { projects, addProject, updateProject, deleteProject } = useProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; project: Project | null }>({
    isOpen: false,
    project: null
  });

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const handleCloseProjectModal = () => {
    setIsProjectModalOpen(false);
    setSelectedProject(null);
  };

  const handleAddProject = (projectData: Omit<Project, 'id' | 'createdAt'>) => {
    addProject(projectData);
  };

  const handleEditProject = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    setEditingProject(project);
    setIsAddModalOpen(true);
  };

  const handleUpdateProject = (id: string, projectData: Omit<Project, 'id' | 'createdAt'>) => {
    updateProject(id, projectData);
    setEditingProject(null);
  };

  const handleDeleteClick = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    setDeleteConfirm({ isOpen: true, project });
  };

  const handleConfirmDelete = () => {
    if (deleteConfirm.project) {
      deleteProject(deleteConfirm.project.id);
      setDeleteConfirm({ isOpen: false, project: null });
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirm({ isOpen: false, project: null });
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setEditingProject(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="relative overflow-hidden border-b border-gray-800/50">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-20 animate-pulse" />
                <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              数字文学小组
              <span className="inline-block ml-3">
                <Sparkles className="w-8 h-8 text-yellow-400 animate-bounce" />
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              探索文学与科技的边界，创造全新的数字化文学体验
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Add Project Button */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">我们的项目</h2>
            <p className="text-gray-400">发现数字文学的无限可能</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            添加项目
          </button>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-800/30 rounded-2xl p-12 border border-gray-700/30">
              <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-400 mb-2">还没有项目</h3>
              <p className="text-gray-500 mb-6">点击上方按钮添加您的第一个项目</p>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                添加项目
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => handleProjectClick(project)}
                onEdit={(e) => handleEditProject(e, project)}
                onDelete={(e) => handleDeleteClick(e, project)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2026 数字文学小组. 以创新之心，续写文学新篇章.
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ProjectModal
        project={selectedProject}
        isOpen={isProjectModalOpen}
        onClose={handleCloseProjectModal}
      />

      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onAddProject={handleAddProject}
        onUpdateProject={handleUpdateProject}
        editingProject={editingProject}
      />

      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        title="删除项目"
        message={`确定要删除项目"${deleteConfirm.project?.title}"吗？此操作无法撤销。`}
        confirmText="删除"
        cancelText="取消"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        type="danger"
      />
    </div>
  );
}

export default App;