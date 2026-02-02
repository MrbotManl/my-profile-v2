import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../../core/services/projects.service';
import { AuthService } from '../../../core/services/auth.service';
import { Project } from '../../../core/models/portfolio.model';
import { PasswordModalComponent } from '../../admin/password-modal/password-modal.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, PasswordModalComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  private projectsService = inject(ProjectsService);
  private authService = inject(AuthService);

  categories = ['All', 'Web Apps', 'UI/Design', 'Mini Apps'];
  activeCategory = signal<string>('All');
  showPasswordModal = signal<boolean>(false);

  get filteredProjects(): Project[] {
    return this.projectsService.getProjectsByCategory(this.activeCategory());
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  selectCategory(category: string): void {
    this.activeCategory.set(category);
  }

  openEditProjects(): void {
    if (this.authService.isAuthenticated()) {
      // Navigate to admin panel or show edit mode
      console.log('Opening admin panel...');
    } else {
      this.showPasswordModal.set(true);
    }
  }

  onPasswordSuccess(): void {
    this.showPasswordModal.set(false);
    console.log('Authenticated! Opening admin panel...');
  }

  onPasswordCancel(): void {
    this.showPasswordModal.set(false);
  }

  openProject(project: Project): void {
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    } else if (project.githubUrl) {
      window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
    }
  }

  openGithub(project: Project): void {
    if (project.githubUrl) {
      window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
    }
  }
}
