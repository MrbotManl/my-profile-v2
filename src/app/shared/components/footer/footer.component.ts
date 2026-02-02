import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvService } from '../../../core/services/cv.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  private cvService = inject(CvService);
  
  currentYear = new Date().getFullYear();
  personalInfo = this.cvService.getPersonalInfo();

  socialLinks = [
    { icon: 'share', url: this.personalInfo.linkedIn, label: 'LinkedIn' },
    { icon: 'terminal', url: this.personalInfo.github, label: 'GitHub' },
    { icon: 'alternate_email', url: `mailto:${this.personalInfo.email}`, label: 'Email' }
  ];

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
