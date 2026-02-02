import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvService } from '../../../core/services/cv.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  private cvService = inject(CvService);
  
  personalInfo = this.cvService.getPersonalInfo();

  stats = [
    { value: `${this.personalInfo.yearsExp}+`, label: 'Years Exp.' },
    { value: `${this.personalInfo.projectsCount}+`, label: 'Projects' },
    { value: '12', label: 'Awards' }
  ];

  scrollToProjects(): void {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  downloadCv(): void {
    this.cvService.generatePDF();
  }
}
