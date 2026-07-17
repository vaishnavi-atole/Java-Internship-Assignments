import { DatePipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Attendance, AttendanceStatus } from '../../models/attendance.model';
import { AttendanceService } from '../../services/attendance.service';
import { AuthService } from '../../services/auth.service';
import { MATERIAL_IMPORTS } from '../../shared/material.imports';

@Component({
  selector: 'app-attendance-page',
  standalone: true,
  imports: [DatePipe, NgIf, ReactiveFormsModule, RouterLink, ...MATERIAL_IMPORTS],
  templateUrl: './attendance.page.html',
  styleUrl: './attendance.page.css'
})
export class AttendancePageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly attendanceService = inject(AttendanceService);
  private readonly authService = inject(AuthService);
  private readonly snackBar = inject(MatSnackBar);
  readonly isStudent = this.authService.hasRole('STUDENT');
  readonly isTeacher = this.authService.hasRole('TEACHER');
  readonly studentId = Number(this.route.snapshot.paramMap.get('id'));
  records: Attendance[] = [];
  loaded = false;
  saving = false;
  columns = ['date', 'status', 'remarks', 'markedBy'];
  readonly maxAttendanceDate = this.startOfToday();
  form = this.fb.nonNullable.group({
    date: [this.startOfToday(), Validators.required],
    status: ['PRESENT' as AttendanceStatus, Validators.required],
    remarks: ['', Validators.maxLength(500)]
  });

  ngOnInit(): void { this.load(); }
  load(): void {
    const request = this.isStudent ? this.attendanceService.getMine() : this.attendanceService.getForStudent(this.studentId);
    request.subscribe((records) => { this.records = records; this.loaded = true; });
  }

  get attendancePercentage(): number {
    if (!this.records.length) {
      return 0;
    }
    return Math.round((this.countByStatus('PRESENT') / this.records.length) * 100);
  }

  countByStatus(status: Attendance['status']): number {
    return this.records.filter((record) => record.status === status).length;
  }

  displayStatus(status: Attendance['status']): string {
    return status.charAt(0) + status.slice(1).toLowerCase();
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const rawValue = this.form.getRawValue();
    const attendanceDate = this.formatLocalDate(rawValue.date);

    if (!attendanceDate) {
      this.form.controls.date.setErrors({ invalidDate: true });
      this.form.controls.date.markAsTouched();
      this.snackBar.open('Please choose a valid attendance date.', 'Close', {
        duration: 3000,
        panelClass: ['snack-error']
      });
      return;
    }

    if (this.isFutureDate(rawValue.date)) {
      this.form.controls.date.setErrors({ futureDate: true });
      this.form.controls.date.markAsTouched();
      this.snackBar.open('Future attendance dates are not allowed.', 'Close', {
        duration: 3000,
        panelClass: ['snack-error']
      });
      return;
    }

    this.saving = true;
    this.attendanceService.mark(this.studentId, {
      date: attendanceDate,
      status: rawValue.status,
      remarks: rawValue.remarks.trim()
    }).subscribe({
      next: () => {
        this.saving = false;
        this.form.controls.remarks.setValue('');
        this.snackBar.open('Attendance marked successfully.', 'Close', {
          duration: 3000,
          panelClass: ['snack-success']
        });
        this.load();
      },
      error: () => {
        this.saving = false;
        this.snackBar.open('Attendance could not be marked. Please try again.', 'Close', {
          duration: 3500,
          panelClass: ['snack-error']
        });
      }
    });
  }

  private startOfToday(): Date {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  private startOfDate(value: Date | string): Date | null {
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
      return null;
    }
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  private isFutureDate(value: Date | string): boolean {
    const selectedDate = this.startOfDate(value);
    return !!selectedDate && selectedDate.getTime() > this.startOfToday().getTime();
  }

  private formatLocalDate(value: Date | string): string | null {
    const date = this.startOfDate(value);
    if (!date) {
      return null;
    }

    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
