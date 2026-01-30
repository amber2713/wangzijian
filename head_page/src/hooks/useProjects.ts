import { useState, useEffect } from 'react';
import { Project } from '../types';

const STORAGE_KEY = 'digital-literature-projects';

const defaultProjects: Project[] = [
  {
    id: '1',
    title: '数字诗歌实验室',
    description: '探索诗歌与数字技术的融合，通过算法生成和交互式体验重新定义诗歌创作。项目包含多种实验性作品，从文本生成到视觉诗歌，展现了文学在数字时代的无限可能。',
    imageUrl: 'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop',
    projectUrl: 'https://example.com/poetry-lab',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: '互动小说平台',
    description: '基于Web技术开发的互动小说创作平台，允许读者通过选择影响故事走向。融合了传统叙事技巧与现代交互设计，为文学创作开辟新的表达形式。',
    imageUrl: 'https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop',
    projectUrl: 'https://example.com/interactive-fiction',
    createdAt: new Date('2024-02-20')
  },
  {
    id: '3',
    title: '文学数据可视化',
    description: '将经典文学作品转化为数据可视化图表，通过图形化的方式展现文本的结构、情感变化和主题分布。让读者从全新角度理解和欣赏文学作品。',
    imageUrl: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop',
    projectUrl: 'https://example.com/lit-visualization',
    createdAt: new Date('2024-03-10')
  }
];

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsedProjects = JSON.parse(saved).map((p: any) => ({
          ...p,
          createdAt: new Date(p.createdAt)
        }));
        setProjects(parsedProjects);
      } else {
        setProjects(defaultProjects);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProjects));
      }
    } catch (error) {
      setProjects(defaultProjects);
    }
  }, []);

  const addProject = (projectData: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date()
    };

    const updatedProjects = [newProject, ...projects];
    setProjects(updatedProjects);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects));
  };

  const updateProject = (id: string, projectData: Omit<Project, 'id' | 'createdAt'>) => {
    const updatedProjects = projects.map(project =>
      project.id === id
        ? { ...project, ...projectData }
        : project
    );
    setProjects(updatedProjects);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects));
  };

  const deleteProject = (id: string) => {
    const updatedProjects = projects.filter(project => project.id !== id);
    setProjects(updatedProjects);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects));
  };

  return { projects, addProject, updateProject, deleteProject };
};