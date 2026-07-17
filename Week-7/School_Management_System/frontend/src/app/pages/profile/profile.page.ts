import { DatePipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MATERIAL_IMPORTS } from '../../shared/material.imports';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/auth.model';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [DatePipe, NgIf, RouterLink, ...MATERIAL_IMPORTS],
  templateUrl: './profile.page.html',
  styleUrl: './profile.page.css'
})
export class ProfilePageComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly studentService = inject(StudentService);
  private readonly router = inject(Router);
  user: User | null = null;
  student: Student | null = null;
  studentLoading = false;

  ngOnInit(): void {
    this.user = this.authService.getUserSnapshot();
    if (!this.user) {
      this.authService.me().subscribe((user) => {
        this.user = user;
        this.loadRoleDetails();
      });
      return;
    }
    this.loadRoleDetails();
  }

  get initials(): string {
    return this.user?.name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('') || '?';
  }

  get roleDescription(): string {
    if (this.user?.role === 'ADMIN') return 'Full system access for managing students, teachers, and college records.';
    if (this.user?.role === 'TEACHER') return 'Teacher account with access to student records and attendance marking.';
    return 'Student account with access to personal academic details and attendance history.';
  }

  get accessLevel(): string {
    if (this.user?.role === 'ADMIN') return 'Administrator';
    if (this.user?.role === 'TEACHER') return 'Teaching staff';
    return 'Student self-service';
  }

  logout(): void {
    this.authService.logout();
    void this.router.navigate(['/login'], { queryParams: { reason: 'logout' } });
  }

  private loadRoleDetails(): void {
    if (this.user?.role !== 'STUDENT') {
      return;
    }

    this.studentLoading = true;
    this.studentService.getMe().subscribe({
      next: (student) => {
        this.student = student;
        this.studentLoading = false;
      },
      error: () => {
        this.student = null;
        this.studentLoading = false;
      }
    });
  }
}
