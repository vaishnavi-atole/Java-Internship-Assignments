import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MATERIAL_IMPORTS } from '../shared/material.imports';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AsyncPipe, NgIf, ...MATERIAL_IMPORTS],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  readonly mobileOpen = signal(false);

  get currentRole(): string {
    return this.authService.getUserSnapshot()?.role ?? '';
  }

  get currentUserInitials(): string {
    const name = this.authService.getUserSnapshot()?.name ?? 'User';
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('') || 'U';
  }

  get isStaff(): boolean {
    return this.authService.hasRole('ADMIN') || this.authService.hasRole('TEACHER');
  }

  toggleSidebar(): void {
    this.mobileOpen.update((open) => !open);
  }

  logout(): void {
    this.authService.logout();
    void this.router.navigate(['/login'], { queryParams: { reason: 'logout' } });
  }
}
