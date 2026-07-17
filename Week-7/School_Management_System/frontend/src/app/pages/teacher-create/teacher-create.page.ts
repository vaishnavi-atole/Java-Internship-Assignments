import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MATERIAL_IMPORTS } from '../../shared/material.imports';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-teacher-create-page',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, RouterLink, ...MATERIAL_IMPORTS],
  templateUrl: './teacher-create.page.html',
  styleUrl: './teacher-create.page.css'
})
export class TeacherCreatePageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loading = false;
  errorMessage = '';
  showPassword = false;
  private readonly passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,100}$/;

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]]
  });

  get previewInitial(): string {
    return this.form.controls.name.value.trim().charAt(0).toUpperCase() || 'T';
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMessage = 'Please enter a valid name, email, and password with at least 8 characters including a letter and a number.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    const rawValue = this.form.getRawValue();
    this.authService.createTeacherAccount({
      name: rawValue.name.trim(),
      email: rawValue.email.trim(),
      password: rawValue.password.trim()
    }).subscribe({
      next: () => this.router.navigate(['/admin/teachers']),
      error: (error) => {
        this.errorMessage = error.error?.message ?? 'The teacher could not be created. Please try again.';
        this.loading = false;
      },
      complete: () => (this.loading = false)
    });
  }
}
