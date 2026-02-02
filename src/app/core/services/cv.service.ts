import { Injectable, inject } from '@angular/core';
import { jsPDF } from 'jspdf';
import { ProjectsService } from './projects.service';
import { Skill, PersonalInfo } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  private projectsService = inject(ProjectsService);

  private personalInfo: PersonalInfo = {
    name: 'Mohamed Mahmoud Mahdy',
    title: 'Full-Stack Developer',
    email: 'multra2006@gmail.com',
    phone: '+20 110 189 1846',
    linkedIn: 'https://www.linkedin.com/in/mohamed-mahdy-898217305/',
    github: 'https://github.com/MrbotManl',
    aboutMe: 'A passionate Full-Stack Developer with expertise in building robust web applications using modern technologies. Focused on creating seamless user experiences and scalable backend architectures. I specialize in Angular, TypeScript, and full-stack development.',
    yearsExp: 1,
    projectsCount: 25,
    clients: 4
  };

  private skills: Skill[] = [
    {
      name: 'Angular',
      percentage: 90,
      icon: 'frame_inspect',
      description: 'Expertise in SPA architecture, RxJS state management, and NGRX. Proficient in building complex enterprise dashboards.',
      color: '#dd0031'
    },
    {
      name: 'JavaScript / TypeScript',
      percentage: 95,
      icon: 'javascript',
      description: 'Core logic and Type-safe development. Deep understanding of ES6+, asynchronous programming, and scalable patterns.',
      color: '#f7df1e'
    },
    {
      name: 'HTML / CSS / Bootstrap',
      percentage: 95,
      icon: 'css',
      description: 'Pixel-perfect responsive design using CSS Grid, Flexbox, and Tailwind. High focus on accessibility and performance.',
      color: '#264de4'
    },
    {
      name: 'Git / GitHub',
      percentage: 85,
      icon: 'account_tree',
      description: 'Version Control and Collaborative Workflow. Experienced with GitFlow, CI/CD pipelines, and pull request reviews.',
      color: '#f05032'
    }
  ];

  getPersonalInfo(): PersonalInfo {
    return this.personalInfo;
  }

  getSkills(): Skill[] {
    return this.skills;
  }

  generatePDF(): void {
    const doc = new jsPDF();
    const margin = 20;
    let yPos = margin;
    const lineHeight = 7;
    const pageWidth = doc.internal.pageSize.getWidth();

    // Header - Name
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(19, 91, 236);
    doc.text(this.personalInfo.name, margin, yPos);
    yPos += 10;

    // Title
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(this.personalInfo.title, margin, yPos);
    yPos += 15;

    // Contact Info
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    const contactLine = `Email: ${this.personalInfo.email} | Phone: ${this.personalInfo.phone}`;
    doc.text(contactLine, margin, yPos);
    yPos += lineHeight;
    doc.text(`LinkedIn: ${this.personalInfo.linkedIn}`, margin, yPos);
    yPos += lineHeight;
    doc.text(`GitHub: ${this.personalInfo.github}`, margin, yPos);
    yPos += 15;

    // Divider
    doc.setDrawColor(19, 91, 236);
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 10;

    // About Me Section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(19, 91, 236);
    doc.text('About Me', margin, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    const aboutLines = doc.splitTextToSize(this.personalInfo.aboutMe, pageWidth - 2 * margin);
    doc.text(aboutLines, margin, yPos);
    yPos += aboutLines.length * lineHeight + 10;

    // Skills Section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(19, 91, 236);
    doc.text('Skills', margin, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);

    this.skills.forEach(skill => {
      doc.text(`• ${skill.name} - ${skill.percentage}%`, margin, yPos);
      yPos += lineHeight;
    });
    yPos += 10;

    // Projects Section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(19, 91, 236);
    doc.text('Projects', margin, yPos);
    yPos += 8;

    const projects = this.projectsService.getPublicProjects();
    doc.setFontSize(10);

    projects.forEach(project => {
      if (yPos > 260) {
        doc.addPage();
        yPos = margin;
      }

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(40, 40, 40);
      doc.text(project.title, margin, yPos);
      yPos += lineHeight;

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60);
      const descLines = doc.splitTextToSize(project.description, pageWidth - 2 * margin);
      doc.text(descLines, margin, yPos);
      yPos += descLines.length * lineHeight;

      doc.setTextColor(19, 91, 236);
      doc.text(`Tech: ${project.techStack.join(', ')}`, margin, yPos);
      yPos += lineHeight;

      if (project.githubUrl) {
        doc.setTextColor(100, 100, 100);
        doc.text(`GitHub: ${project.githubUrl}`, margin, yPos);
        yPos += lineHeight;
      }
      if (project.liveUrl) {
        doc.text(`Live: ${project.liveUrl}`, margin, yPos);
        yPos += lineHeight;
      }
      yPos += 5;
    });

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('Generated from Portfolio - Mohamed Mahmoud Mahdy', margin, 285);

    // Save the PDF
    doc.save('Mohamed_Mahmoud_Mahdy_CV.pdf');
  }
}
