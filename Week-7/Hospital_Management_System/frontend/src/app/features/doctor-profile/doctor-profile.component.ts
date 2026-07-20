import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PageHeaderComponent } from '../../shared/page-header/page-header.component';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../models/models';

@Component({
  selector: 'app-doctor-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatSnackBarModule, PageHeaderComponent],
  templateUrl: './doctor-profile.component.html',
  styleUrl: './doctor-profile.component.css'
})
export class DoctorProfileComponent implements OnInit {
  doctor: Doctor | null = null;
  form: FormGroup;
  editing = false;

  constructor(private fb: FormBuilder, private doctorService: DoctorService, private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      firstName: ['', Validators.required], lastName: ['', Validators.required], qualification: ['', Validators.required], specialization: ['', Validators.required],
      departmentId: [null, Validators.required], experienceYears: [0, [Validators.required, Validators.min(0)]], phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], availability: ['', Validators.required], consultationFee: [0, [Validators.required, Validators.min(0)]], photoUrl: [''], active: [true], password: ['']
    });
  }

  ngOnInit(): void {
    this.doctorService.getDoctors().subscribe({
      next: (response) => {
        this.doctor = response.data[0] ?? null;
        if (this.doctor) this.resetToReadOnly();
      },
      error: () => this.snackBar.open('Unable to load your profile', 'Close', { duration: 2500 })
    });
  }

  save(): void {
    if (!this.doctor?.id || this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.doctorService.updateDoctor(this.doctor.id, this.form.getRawValue()).subscribe({
      next: (response) => { this.doctor = response.data; this.resetToReadOnly(); this.snackBar.open('Profile updated', 'Close', { duration: 2500 }); },
      error: (error) => this.snackBar.open(error.error?.message ?? 'Unable to update your profile', 'Close', { duration: 3000 })
    });
  }

  startEditing(): void {
    this.editing = true;
    this.form.enable();
    this.form.get('departmentId')?.disable();
    this.form.get('email')?.disable();
  }

  cancelEditing(): void { this.resetToReadOnly(); }

  private resetToReadOnly(): void {
    this.editing = false;
    this.form.patchValue({ ...this.doctor, password: '' });
    this.form.disable();
  }
}
