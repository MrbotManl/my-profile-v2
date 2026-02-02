import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CvService } from '../../../core/services/cv.service';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private cvService = inject(CvService);

  personalInfo = this.cvService.getPersonalInfo();
  isSubmitting = signal(false);
  isSubmitted = signal(false);

  formData: ContactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  contactInfo = [
    {
      icon: 'mail',
      label: 'Email',
      value: this.personalInfo.email,
      href: `mailto:${this.personalInfo.email}`
    },
    {
      icon: 'phone',
      label: 'Phone',
      value: this.personalInfo.phone,
      href: `tel:${this.personalInfo.phone.replace(/\s/g, '')}`
    },
    {
      icon: 'location_on',
      label: 'Location',
      value: 'Cairo, Egypt',
      href: null
    }
  ];

  socialLinks = [
    {
      icon: 'Link',
      label: 'LinkedIn',
      url: this.personalInfo.linkedIn
    },
    {
      icon: 'terminal',
      label: 'GitHub',
      url: this.personalInfo.github
    }
  ];

  onSubmit(): void {
    if (this.isFormValid()) {
      this.isSubmitting.set(true);

      // Simulate form submission
      setTimeout(() => {
        this.isSubmitting.set(false);
        this.isSubmitted.set(true);

        // Reset form after showing success
        setTimeout(() => {
          this.isSubmitted.set(false);
          this.resetForm();
        }, 3000);
      }, 1500);
    }
  }

  isFormValid(): boolean {
    return !!(
      this.formData.name.trim() &&
      this.formData.email.trim() &&
      this.formData.message.trim() &&
      this.isValidEmail(this.formData.email)
    );
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}
