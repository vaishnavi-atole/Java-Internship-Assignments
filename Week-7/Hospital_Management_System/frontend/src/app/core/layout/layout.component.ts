import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatIconModule, MatButtonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  readonly isDarkMode = signal(false);
  readonly sidebarOpen = signal(true);
  currentUser = '';

  navigation: Array<{ label: string; icon: string; link: string; roles: string[] }> = [
    { label: 'Dashboard', icon: 'dashboard', link: '/dashboard', roles: ['ADMIN'] },
    { label: 'Departments', icon: 'business', link: '/departments', roles: ['ADMIN'] },
    { label: 'Doctors', icon: 'medical_services', link: '/doctors', roles: ['ADMIN'] },
    { label: 'Receptionists', icon: 'support_agent', link: '/staff', roles: ['ADMIN'] },
    { label: 'Patients', icon: 'people', link: '/patients', roles: ['ADMIN'] },
    { label: 'Appointments', icon: 'event', link: '/appointments', roles: ['ADMIN'] },
    { label: 'Prescriptions', icon: 'description', link: '/prescriptions', roles: ['ADMIN'] },
    { label: 'Billing', icon: 'receipt_long', link: '/billing', roles: ['ADMIN', 'RECEPTIONIST'] },
    { label: 'Reports', icon: 'bar_chart', link: '/reports', roles: ['ADMIN', 'DOCTOR'] },
    { label: 'Settings', icon: 'settings', link: '/settings', roles: ['ADMIN'] },
    { label: 'My Appointments', icon: 'event', link: '/appointments', roles: ['DOCTOR'] },
    { label: 'My Patients', icon: 'people', link: '/patients', roles: ['DOCTOR'] },
    { label: 'Profile', icon: 'account_circle', link: '/profile', roles: ['DOCTOR'] },
    { label: 'Patient Registration', icon: 'person_add', link: '/patients', roles: ['RECEPTIONIST'] },
    { label: 'Appointments', icon: 'event', link: '/appointments', roles: ['RECEPTIONIST'] },
    { label: 'Patient Search', icon: 'search', link: '/search', roles: ['RECEPTIONIST'] }
  ];

  constructor(public authService: AuthService, private router: Router) {
    this.currentUser = this.authService.getCurrentUser();
    document.body.classList.toggle('role-doctor', this.authService.hasRole('DOCTOR'));
    document.body.classList.toggle('role-receptionist', this.authService.hasRole('RECEPTIONIST'));
    document.body.classList.toggle('role-admin', this.authService.hasRole('ADMIN'));
  }

  toggleDarkMode(): void {
    this.isDarkMode.set(!this.isDarkMode());
    document.body.classList.toggle('dark-mode', this.isDarkMode());
  }

  toggleSidebar(): void {
    this.sidebarOpen.set(!this.sidebarOpen());
  }

  logout(): void {
    this.authService.logout();
  }

  goToSearch(): void {
    this.router.navigate(['/search']);
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  get visibleNavigation() { return this.navigation.filter((item) => item.roles.includes(this.authService.getRole())); }
}
