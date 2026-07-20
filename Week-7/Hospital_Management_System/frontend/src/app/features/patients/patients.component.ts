import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PatientService } from '../../services/patient.service';
import { PageHeaderComponent } from '../../shared/page-header/page-header.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { Patient } from '../../models/models';
import { AuthService } from '../../core/authentication/auth.service';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../models/models';
import { PatientHistoryDialogComponent } from './patient-history-dialog.component';
import { PrescriptionService } from '../../services/prescription.service';
import { Prescription } from '../../models/models';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatDatepickerModule, MatSnackBarModule, MatDialogModule, PageHeaderComponent],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent implements OnInit {
  @ViewChild(FormGroupDirective) private formDirective?: FormGroupDirective;
  patients: Patient[] = [];
  appointments: Appointment[] = [];
  prescriptions: Prescription[] = [];
  form: FormGroup;
  editingId: number | null = null;
  readonly maxDate = new Date();

  constructor(private fb: FormBuilder, private patientService: PatientService, private appointmentService: AppointmentService, private prescriptionService: PrescriptionService, private snackBar: MatSnackBar, private dialog: MatDialog, private authService: AuthService) {
    this.form = this.fb.group({ firstName: ['', Validators.required], lastName: ['', Validators.required], gender: [null, Validators.required], dob: [null, Validators.required], age: [0], bloodGroup: [''], phone: ['', [Validators.required, Validators.pattern(/^[0-9+() -]{7,20}$/)]], email: [''], address: [''], emergencyContact: [''], medicalHistory: [''], photoUrl: [''], active: [true] });
  }

  ngOnInit(): void { this.load(); if (this.isDoctor()) { this.appointmentService.getAppointments().subscribe((res) => this.appointments = res.data); this.prescriptionService.getPrescriptions().subscribe((res) => this.prescriptions = res.data); } }
  isDoctor(): boolean { return this.authService.hasRole('DOCTOR'); }
  load(): void { this.patientService.getPatients().subscribe((res) => this.patients = res.data); }
  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); this.snackBar.open('Complete the required patient details', 'Close', { duration: 2500 }); return; }
    const value = this.form.value;
    const payload: Patient = { ...value, dob: this.toDateString(value.dob) };
    const request = this.editingId ? this.patientService.updatePatient(this.editingId, payload) : this.patientService.createPatient(payload);
    request.subscribe({ next: () => { this.resetForm(); this.editingId = null; this.load(); this.snackBar.open('Patient saved', 'Close', { duration: 2500 }); }, error: (error) => this.snackBar.open(error.error?.message ?? 'Unable to save patient', 'Close', { duration: 2500 }) });
  }
  edit(item: Patient): void { this.editingId = item.id ?? null; this.form.patchValue({ ...item, dob: item.dob ? new Date(`${item.dob}T00:00:00`) : null }); }
  viewHistory(patient: Patient): void {
    const now = new Date();
    const visits = this.appointments.filter((appointment) => {
      if (appointment.patientId !== patient.id) return false;
      const scheduledAt = new Date(`${appointment.appointmentDate}T${appointment.appointmentTime ?? '00:00'}:00`);
      return appointment.status === 'COMPLETED' || scheduledAt <= now;
    }).sort((a, b) => `${b.appointmentDate} ${b.appointmentTime}`.localeCompare(`${a.appointmentDate} ${a.appointmentTime}`));
    const prescriptions = this.prescriptions.filter((prescription) => prescription.patientId === patient.id);
    this.dialog.open(PatientHistoryDialogComponent, { width: '600px', maxWidth: '94vw', data: { patientName: `${patient.firstName} ${patient.lastName}`, patientId: patient.patientId ?? '', appointments: visits, prescriptions } });
  }
  private toDateString(value: Date | string): string { return value instanceof Date ? value.toISOString().slice(0, 10) : value; }
  private resetForm(): void { this.formDirective?.resetForm({ active: true }); if (!this.formDirective) this.form.reset({ active: true }); }
  delete(item: Patient): void { const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { title: 'Delete Patient', message: 'Remove this patient record?' } }); dialogRef.afterClosed().subscribe((confirmed) => { if (confirmed && item.id) { this.patientService.deletePatient(item.id).subscribe(() => { this.load(); this.snackBar.open('Patient removed', 'Close', { duration: 2500 }); }); } }); }
}
