import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DoctorService } from '../../services/doctor.service';
import { DepartmentService } from '../../services/department.service';
import { PageHeaderComponent } from '../../shared/page-header/page-header.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { Department, Doctor } from '../../models/models';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/authentication/auth.service';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatSnackBarModule, MatDialogModule, PageHeaderComponent],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent implements OnInit {
  @ViewChild(FormGroupDirective) private formDirective?: FormGroupDirective;
  doctors: Doctor[] = [];
  departments: Department[] = [];
  form: FormGroup;
  editingId: number | null = null;
  selectedPhoto: File | null = null;
  photoPreviewUrl: string | null = null;

  constructor(private fb: FormBuilder, private doctorService: DoctorService, private departmentService: DepartmentService, private snackBar: MatSnackBar, private dialog: MatDialog, private authService: AuthService) {
    this.form = this.fb.group({
      firstName: ['', Validators.required], lastName: ['', Validators.required], qualification: ['', Validators.required], specialization: ['', Validators.required],
      departmentId: [null, Validators.required], experienceYears: [null, [Validators.required, Validators.min(0)]], phone: ['', [Validators.required, Validators.pattern(/^[0-9+() -]{7,20}$/)]],
      email: ['', [Validators.required, Validators.email]], password: ['', [Validators.required, Validators.minLength(6)]], availability: [null, Validators.required], consultationFee: [null, [Validators.required, Validators.min(0)]], photoUrl: [''], active: [true]
    });
  }

  ngOnInit(): void { this.load(); this.departmentService.getDepartments().subscribe((res) => this.departments = res.data); }
  isDoctor(): boolean { return this.authService.hasRole('DOCTOR'); }

  load(): void { this.doctorService.getDoctors().subscribe((res) => this.doctors = res.data); }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); this.snackBar.open('Complete all required doctor details', 'Close', { duration: 2500 }); return; }
    if (this.selectedPhoto) {
      this.doctorService.uploadDoctorPhoto(this.selectedPhoto).subscribe({
        next: (response) => this.saveDoctor({ ...this.form.value, photoUrl: response.data.url }),
        error: () => this.snackBar.open('Unable to upload the selected photo', 'Close', { duration: 2500 })
      });
      return;
    }
    this.saveDoctor(this.form.value);
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    if (!file) { return; }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) {
      input.value = '';
      this.snackBar.open('Choose a JPG, PNG, or WEBP image up to 5 MB', 'Close', { duration: 3000 });
      return;
    }
    this.selectedPhoto = file;
    this.photoPreviewUrl = URL.createObjectURL(file);
    this.form.patchValue({ photoUrl: 'pending-upload' });
  }

  photoUrl(path?: string): string | null {
    if (!path) { return null; }
    return path.startsWith('/') ? `${environment.apiUrl.replace('/api', '')}${path}` : path;
  }

  private saveDoctor(payload: Doctor): void {
    const request = this.editingId ? this.doctorService.updateDoctor(this.editingId, payload) : this.doctorService.createDoctor(payload);
    request.subscribe({
      next: () => {
        this.resetForm();
        this.editingId = null;
        this.selectedPhoto = null;
        this.photoPreviewUrl = null;
        this.load();
        this.snackBar.open('Doctor saved', 'Close', { duration: 2500 });
      },
      error: () => this.snackBar.open('Unable to save doctor', 'Close', { duration: 2500 })
    });
  }

  edit(item: Doctor): void { this.editingId = item.id ?? null; this.selectedPhoto = null; this.photoPreviewUrl = this.photoUrl(item.photoUrl); this.form.patchValue({ ...item, password: '' }); this.form.get('password')?.clearValidators(); this.form.get('password')?.updateValueAndValidity(); }

  private resetForm(): void { this.formDirective?.resetForm({ active: true, password: '' }); if (!this.formDirective) this.form.reset({ active: true, password: '' }); this.form.get('password')?.setValidators([Validators.required, Validators.minLength(6)]); this.form.get('password')?.updateValueAndValidity(); }

  delete(item: Doctor): void { const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { title: 'Delete Doctor', message: 'Remove this doctor from the schedule?' } }); dialogRef.afterClosed().subscribe((confirmed) => { if (confirmed && item.id) { this.doctorService.deleteDoctor(item.id).subscribe(() => { this.load(); this.snackBar.open('Doctor removed', 'Close', { duration: 2500 }); }); } }); }
}
