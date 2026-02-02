import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_KEY = 'portfolio-auth';
  private readonly ADMIN_PASSWORD = 'Alone000';

  isAuthenticated = signal<boolean>(this.checkAuth());

  private checkAuth(): boolean {
    const session = localStorage.getItem(this.AUTH_KEY);
    if (session) {
      try {
        const parsed = JSON.parse(session);
        // Session expires after 1 hour
        if (parsed.timestamp && Date.now() - parsed.timestamp < 3600000) {
          return true;
        }
      } catch {
        return false;
      }
    }
    return false;
  }

  login(password: string): boolean {
    if (password === this.ADMIN_PASSWORD) {
      localStorage.setItem(this.AUTH_KEY, JSON.stringify({
        authenticated: true,
        timestamp: Date.now()
      }));
      this.isAuthenticated.set(true);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
    this.isAuthenticated.set(false);
  }

  validatePassword(password: string): boolean {
    return password === this.ADMIN_PASSWORD;
  }
}
