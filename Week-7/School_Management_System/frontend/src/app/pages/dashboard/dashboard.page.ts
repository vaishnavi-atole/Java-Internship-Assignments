import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material.imports';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardStats } from '../../models/dashboard.model';
import { AuthService } from '../../services/auth.service';
import { Role } from '../../models/auth.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, ...MATERIAL_IMPORTS],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.css'
})
export class DashboardPageComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);
  private readonly authService = inject(AuthService);
  stats: DashboardStats | null = null;
  role: Role = this.authService.getUserSnapshot()?.role ?? 'STUDENT';

  get currentUserName(): string {
    return this.authService.getUserSnapshot()?.name ?? 'User';
  }

  get userInitials(): string {
    return this.currentUserName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('') || 'U';
  }

  get roleEyebrow(): string {
    if (this.role === 'ADMIN') return 'System control';
    if (this.role === 'TEACHER') return 'Teacher portal';
    return 'Student portal';
  }

  get dashboardTitle(): string {
    if (this.role === 'ADMIN') return 'Admin Dashboard';
    if (this.role === 'TEACHER') return 'Teacher Dashboard';
    return 'Student Dashboard';
  }

  get heroTitle(): string {
    if (this.role === 'ADMIN') return 'Welcome to your admin command center';
    if (this.role === 'TEACHER') return 'Your class management workspace';
    return 'Welcome to your student workspace';
  }

  get heroDescription(): string {
    if (this.role === 'ADMIN') return 'Monitor student records, manage teacher accounts, and keep the college system organized from one place.';
    if (this.role === 'TEACHER') return 'Review student information and mark date-wise attendance quickly from the student list.';
    return 'Your academic information and attendance are private to your account and available anytime.';
  }

  get dashboardSubtitle(): string {
    if (this.role === 'ADMIN') return 'Manage users, teachers, and the full college system.';
    if (this.role === 'TEACHER') return 'Review students and manage class records.';
    return 'View your profile and student information.';
  }

  departmentInitial(department: string): string {
    return department.trim().charAt(0).toUpperCase() || 'D';
  }

  departmentPercentage(total: number): number {
    if (!this.stats?.totalStudents) {
      return 0;
    }

    return Math.round((total / this.stats.totalStudents) * 100);
  }

  studentInitials(firstName: string, lastName: string): string {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }

  ngOnInit(): void {
    if (this.role !== 'STUDENT') {
      this.dashboardService.getStats().subscribe((stats) => (this.stats = stats));
    }
  }
}
