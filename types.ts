export interface Project {
  id: string;
  userId: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string | null;
  projectUrl: string | null;
  githubRepoUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  createdBy: {
      id: string;
      name: string | null;
      email: string | null;
  }
}


