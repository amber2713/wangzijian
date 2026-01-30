export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  createdAt: Date;
}

export interface ProjectFormData {
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  imageFile?: File | null;
}