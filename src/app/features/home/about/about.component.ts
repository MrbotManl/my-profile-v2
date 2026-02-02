import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvService } from '../../../core/services/cv.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  private cvService = inject(CvService);

  personalInfo = this.cvService.getPersonalInfo();

  highlights = [
    {
      icon: 'code',
      title: 'Clean Code',
      description: 'Writing maintainable, scalable, and well-documented code following best practices.'
    },
    {
      icon: 'speed',
      title: 'Performance',
      description: 'Optimizing applications for speed and efficiency across all devices.'
    },
    {
      icon: 'devices',
      title: 'Responsive Design',
      description: 'Creating seamless experiences across desktop, tablet, and mobile devices.'
    },
    {
      icon: 'sync',
      title: 'Agile Workflow',
      description: 'Experienced in sprint planning, code reviews, and continuous integration.'
    }
  ];

  downloadCv(): void {
    this.cvService.generatePDF();
  }
}
