import { Component, inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MATERIAL_IMPORTS } from '../../shared/material.imports';
import { StudentService } from '../../services/student.service';
import { StudentRequest } from '../../models/student.model';

@Component({
  selector: 'app-student-form-page',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, RouterLink, ...MATERIAL_IMPORTS],
  templateUrl: './student-form.page.html',
  styleUrl: './student-form.page.css'
})
export class StudentFormPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly studentService = inject(StudentService);

  loading = false;
  errorMessage = '';
  isEditMode = false;
  showLoginPassword = false;
  studentId: number | null = null;
  readonly maxDate = new Date();
  private readonly phonePattern = /^[0-9+()\-\s]{7,20}$/;
  private readonly semesterPattern = /^[1-9][0-9]?$/;
  private readonly sectionPattern = /^[A-Za-z0-9-]{1,10}$/;
  private readonly passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,100}$/;

  form = this.fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(this.phonePattern)]],
    gender: ['MALE' as 'MALE' | 'FEMALE' | 'OTHER', Validators.required],
    dateOfBirth: [null as Date | null],
    department: ['', [Validators.required, Validators.maxLength(100)]],
    course: ['', [Validators.required, Validators.maxLength(100)]],
    semester: ['', [Validators.required, Validators.pattern(this.semesterPattern)]],
    section: ['', [Validators.required, Validators.pattern(this.sectionPattern)]],
    address: ['', [Validators.required, Validators.maxLength(1000)]],
    loginPassword: ['', [Validators.pattern(this.passwordPattern)]]
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.studentId = Number(id);
      this.isEditMode = true;
      this.form.controls.loginPassword.clearValidators();
      this.form.controls.loginPassword.addValidators(Validators.pattern(this.passwordPattern));
      this.studentService.getStudent(this.studentId).subscribe((student) => {
        this.form.patchValue({
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          phone: student.phone,
          gender: student.gender,
          dateOfBirth: this.parseLocalDate(student.dateOfBirth),
          department: student.department,
          course: student.course,
          semester: student.semester,
          section: student.section,
          address: student.address
        });
      });
    } else {
      this.form.controls.loginPassword.addValidators(Validators.required);
      this.form.controls.loginPassword.updateValueAndValidity();
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      const password = this.form.controls.loginPassword;
      this.errorMessage = !this.isEditMode && password.hasError('required')
        ? 'Enter a login password for the student.'
        : password.hasError('pattern')
          ? 'The login password must be 8+ characters and include at least one letter and one number.'
          : 'Please complete all required fields with valid information.';
      return;
    }
    this.errorMessage = '';
    const rawValue = this.form.getRawValue();
    const dateOfBirth = this.formatLocalDate(rawValue.dateOfBirth as Date | string | null);

    if (rawValue.dateOfBirth && !dateOfBirth) {
      this.errorMessage = 'Please enter Date of Birth as dd/mm/yyyy or choose it from the calendar.';
      return;
    }

    const payload = {
      firstName: rawValue.firstName.trim(),
      lastName: rawValue.lastName.trim(),
      email: rawValue.email.trim(),
      phone: rawValue.phone.trim(),
      gender: rawValue.gender,
      dateOfBirth,
      department: rawValue.department.trim(),
      course: rawValue.course.trim(),
      semester: rawValue.semester.trim(),
      section: rawValue.section.trim(),
      address: rawValue.address.trim(),
      loginPassword: rawValue.loginPassword?.trim() || undefined
    } as StudentRequest;
    this.loading = true;
    const request = this.isEditMode && this.studentId !== null
      ? this.studentService.updateStudent(this.studentId, payload)
      : this.studentService.createStudent(payload);

    request.subscribe({
      next: () => this.router.navigate(['/students']),
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = this.extractErrorMessage(error);
      },
      complete: () => (this.loading = false)
    });
  }

  private parseLocalDate(value: string | null): Date | null {
    if (!value) {
      return null;
    }

    const [year, month, day] = value.split('-').map(Number);
    if (!year || !month || !day) {
      return null;
    }

    return new Date(year, month - 1, day);
  }

  private formatLocalDate(value: Date | string | null): string | null {
    if (!value) {
      return null;
    }

    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (!trimmed) {
        return null;
      }

      const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
      if (isoMatch) {
        const [, year, month, day] = isoMatch.map(Number);
        return this.isValidDateParts(year, month, day) ? trimmed : null;
      }

      const localMatch = /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/.exec(trimmed);
      if (localMatch) {
        const [, day, month, year] = localMatch.map(Number);
        return this.isValidDateParts(year, month, day)
          ? `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          : null;
      }

      const parsed = new Date(trimmed);
      if (Number.isNaN(parsed.getTime())) {
        return null;
      }
      value = parsed;
    }

    if (Number.isNaN(value.getTime())) {
      return null;
    }

    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private isValidDateParts(year: number, month: number, day: number): boolean {
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  }

  private extractErrorMessage(error: HttpErrorResponse): string {
    const fallback = this.isEditMode
      ? 'The student could not be updated. Please try again.'
      : 'The student could not be created. Please try again.';
    const message = error.error?.message ?? fallback;
    const details = Array.isArray(error.error?.details) ? error.error.details : [];

    return details.length ? `${message}: ${details.join(', ')}` : message;
  }
}
