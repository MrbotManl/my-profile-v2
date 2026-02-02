import { Injectable, signal } from '@angular/core';
import { Project } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private readonly PROJECTS_KEY = 'portfolio-projects';

  private defaultProjects: Project[] = [
    {
      id: '1',
      title: 'My To Do',
      description: 'A gamified productivity To-Do app with quest-like tasks. Features include task filtering, completion tracking, and a modern UI design.',
      techStack: ['HTML', 'CSS', 'JavaScript'],
      category: 'Mini Apps',
      imageUrl: 'assets/images/project-todo.png',
      githubUrl: 'https://github.com/MrbotManl/My_To_DO',
      liveUrl: 'https://my-to-do-sandy.vercel.app/',
      isPublic: true,
      lastUpdated: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'Furni - Interior Design',
      description: 'A modern interior design studio website with elegant UI. Features include product showcase, shop functionality, and responsive design.',
      techStack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
      category: 'Web Apps',
      imageUrl: 'assets/images/project-furni.png',
      githubUrl: 'https://github.com/MrbotManl/Furni-',
      liveUrl: 'https://furni-liart.vercel.app/',
      isPublic: true,
      lastUpdated: new Date('2024-02-10')
    },
    {
      id: '3',
      title: 'NFA to DFA Converter',
      description: 'An algorithm implementation that converts Non-deterministic Finite Automata to Deterministic Finite Automata. A computer science theory project.',
      techStack: ['Python', 'Algorithm'],
      category: 'Mini Apps',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
      githubUrl: 'https://github.com/MrbotManl/Convert-From-NFA-to-DFA',
      liveUrl: '',
      isPublic: true,
      lastUpdated: new Date('2024-01-20')
    },
    {
      id: '4',
      title: 'L7ale7 Tracker App',
      description: 'A tracking application for monitoring and managing daily activities. Collaborative project with team features.',
      techStack: ['Angular', 'TypeScript', 'Firebase'],
      category: 'Web Apps',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      githubUrl: 'https://github.com/MAMAFH/L7ale7_Tracker_App',
      liveUrl: '',
      isPublic: true,
      lastUpdated: new Date('2024-02-01')
    }
  ];

  projects = signal<Project[]>(this.loadProjects());

  private loadProjects(): Project[] {
    const saved = localStorage.getItem(this.PROJECTS_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((p: any) => ({
          ...p,
          lastUpdated: new Date(p.lastUpdated)
        }));
      } catch {
        return this.defaultProjects;
      }
    }
    return this.defaultProjects;
  }

  private saveProjects(): void {
    localStorage.setItem(this.PROJECTS_KEY, JSON.stringify(this.projects()));
  }

  getProjectsByCategory(category: string): Project[] {
    if (category === 'All') {
      return this.projects();
    }
    return this.projects().filter(p => p.category === category);
  }

  getProjectById(id: string): Project | undefined {
    return this.projects().find(p => p.id === id);
  }

  addProject(project: Omit<Project, 'id' | 'lastUpdated'>): void {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      lastUpdated: new Date()
    };
    this.projects.update(current => [...current, newProject]);
    this.saveProjects();
  }

  updateProject(id: string, updates: Partial<Project>): void {
    this.projects.update(current => 
      current.map(p => p.id === id ? { ...p, ...updates, lastUpdated: new Date() } : p)
    );
    this.saveProjects();
  }

  deleteProject(id: string): void {
    this.projects.update(current => current.filter(p => p.id !== id));
    this.saveProjects();
  }

  toggleProjectVisibility(id: string): void {
    this.projects.update(current =>
      current.map(p => p.id === id ? { ...p, isPublic: !p.isPublic } : p)
    );
    this.saveProjects();
  }

  getPublicProjects(): Project[] {
    return this.projects().filter(p => p.isPublic);
  }

  resetToDefaults(): void {
    this.projects.set(this.defaultProjects);
    this.saveProjects();
  }
}
