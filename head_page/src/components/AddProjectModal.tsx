import React, { useState } from 'react';
import { X, Plus, Image, Link2, FileText, Heading, Upload, Save } from 'lucide-react';
import { Project, ProjectFormData } from '../types';
import { convertImageToBase64, validateImageFile } from '../utils/imageUtils';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  onUpdateProject?: (id: string, project: Omit<Project, 'id' | 'createdAt'>) => void;
  editingProject?: Project | null;
}

export const AddProjectModal: React.FC<AddProjectModalProps> = ({ 
  isOpen, 
  onClose, 
  onAddProject, 
  onUpdateProject,
  editingProject 
}) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    imageUrl: '',
    projectUrl: '',
    imageFile: null
  });
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  React.useEffect(() => {
    if (editingProject) {
      setFormData({
        title: editingProject.title,
        description: editingProject.description,
        imageUrl: editingProject.imageUrl,
        projectUrl: editingProject.projectUrl,
        imageFile: null
      });
      setImagePreview(editingProject.imageUrl);
    } else {
      setFormData({ title: '', description: '', imageUrl: '', projectUrl: '', imageFile: null });
      setImagePreview('');
    }
  }, [editingProject, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) return;
    
    setIsUploading(true);
    
    try {
      let finalImageUrl = formData.imageUrl;
      
      if (formData.imageFile) {
        finalImageUrl = await convertImageToBase64(formData.imageFile);
      }
      
      const projectData = {
        title: formData.title,
        description: formData.description,
        imageUrl: finalImageUrl,
        projectUrl: formData.projectUrl
      };
      
      if (editingProject && onUpdateProject) {
        onUpdateProject(editingProject.id, projectData);
      } else {
        onAddProject(projectData);
      }
      
      setFormData({ title: '', description: '', imageUrl: '', projectUrl: '', imageFile: null });
      setImagePreview('');
    } catch (error) {
      console.error('Error processing image:', error);
      alert('图片处理失败，请重试');
    } finally {
      setIsUploading(false);
    }
    
    onClose();
  };

  const handleChange = (field: keyof ProjectFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!validateImageFile(file)) {
      alert('请上传PNG或JPG格式的图片，文件大小不超过5MB');
      return;
    }
    
    setFormData(prev => ({ ...prev, imageFile: file, imageUrl: '' }));
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUrlChange = (value: string) => {
    handleChange('imageUrl', value);
    setFormData(prev => ({ ...prev, imageFile: null }));
    setImagePreview(value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-gray-800 rounded-2xl max-w-lg w-full border border-gray-700 max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">
            {editingProject ? '编辑项目' : '添加新项目'}
          </h2>
          <button 
            onClick={onClose}
            className="bg-gray-700/50 backdrop-blur-sm rounded-full p-2 text-gray-400 hover:text-white hover:bg-gray-600/50 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Heading className="w-4 h-4" />
              项目标题
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              placeholder="输入项目标题"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <FileText className="w-4 h-4" />
              项目简介
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 resize-none"
              placeholder="输入项目简介"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Image className="w-4 h-4" />
              封面图片URL
            </label>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <label className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-center gap-2 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-300 hover:bg-gray-600 transition-colors duration-200">
                    <Upload className="w-4 h-4" />
                    上传图片
                  </div>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              
              <div className="text-center text-gray-400 text-sm">或</div>
              
            <input
              type="url"
                value={formData.imageUrl}
                onChange={(e) => handleImageUrlChange(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              placeholder="https://example.com/image.jpg"
            />
              
              {imagePreview && (
                <div className="mt-3">
                  <img
                    src={imagePreview}
                    alt="预览"
                    className="w-full h-32 object-cover rounded-lg border border-gray-600"
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Link2 className="w-4 h-4" />
              项目网址
            </label>
            <input
              type="url"
              value={formData.projectUrl}
              onChange={(e) => handleChange('projectUrl', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              placeholder="https://example.com"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-400 hover:text-white transition-colors duration-200"
              disabled={isUploading}
            >
              取消
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  处理中...
                </>
              ) : (
                <>
                  {editingProject ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {editingProject ? '保存更改' : '添加项目'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};