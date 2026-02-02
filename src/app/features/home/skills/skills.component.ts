import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvService } from '../../../core/services/cv.service';
import { Skill } from '../../../core/models/portfolio.model';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  private cvService = inject(CvService);

  skills: Skill[] = this.cvService.getSkills();
}
