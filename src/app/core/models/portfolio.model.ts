// Data models for the portfolio

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  category: 'Web Apps' | 'Mobile Apps' | 'Mini Apps';
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
  isPublic: boolean;
  lastUpdated: Date;
}

export interface Skill {
  name: string;
  percentage: number;
  icon: string;
  description: string;
  color: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  linkedIn: string;
  github: string;
  aboutMe: string;
  yearsExp: number;
  projectsCount: number;
  clients: number;
}
