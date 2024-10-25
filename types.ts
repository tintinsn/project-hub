export interface Project {
  id: string;
  userId?: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string | null;
  projectUrl: string | null;
  githubRepoUrl: string | null;
  blurDataURL?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  };
}

export interface Experience {
  id: string;
  start_date: string;
  end_date: string;
  job_title: string;
  company_name: string;
  company_location: string;
  company_image: string;
  description: string[];
  tech_skills: string[];
}

export interface Education {
  id: string;
  start_date: string;
  end_date: string;
  major: string;
  university: string;
}

export interface UserInfo {
  bio: string;
}

export interface Profile {
  id: string;
  userId: string;
  slug: string;
  jobTitle: string | null;
  bio: string | null;
  education: Education[];
  experience: Experience[];
  technicalSkills: string[];
  tools: string[];
  githubLink: string | null;
  linkedinLink: string | null;
  phoneNumber: string | null;
  email: string | null;
  address: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: {
    name: string | null;
    email: string | null;
    image: string | null;
  };
  projects: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string;
    technologies: string[];
    imageUrl: string | null;
    projectUrl: string | null;
    githubRepoUrl: string | null;
  }[];
}
