import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeroComponent } from './features/home/hero/hero.component';
import { ProjectsComponent } from './features/home/projects/projects.component';
import { SkillsComponent } from './features/home/skills/skills.component';
import { AboutComponent } from './features/home/about/about.component';
import { ContactComponent } from './features/home/contact/contact.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    ProjectsComponent,
    SkillsComponent,
    AboutComponent,
    ContactComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';
}
