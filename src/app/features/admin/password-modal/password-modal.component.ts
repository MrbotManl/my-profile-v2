import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-password-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './password-modal.component.html',
  styleUrl: './password-modal.component.scss'
})
export class PasswordModalComponent {
  @Output() onSuccess = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  private authService = inject(AuthService);

  password = '';
  error = signal<string>('');
  isLoading = signal<boolean>(false);

  confirmAccess(): void {
    if (!this.password.trim()) {
      this.error.set('Please enter a password');
      return;
    }

    this.isLoading.set(true);
    this.error.set('');

    // Simulate a small delay for better UX
    setTimeout(() => {
      const success = this.authService.login(this.password);
      
      if (success) {
        this.onSuccess.emit();
      } else {
        this.error.set('Invalid password. Please try again.');
      }
      
      this.isLoading.set(false);
    }, 500);
  }

  cancel(): void {
    this.onCancel.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.cancel();
    }
  }
}
