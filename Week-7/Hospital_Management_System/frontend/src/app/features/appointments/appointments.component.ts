import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppointmentService } from '../../services/appointment.service';
import { PageHeaderComponent } from '../../shared/page-header/page-header.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { Appointment } from '../../models/models';
import { Department, Doctor, Patient } from '../../models/models';
import { DepartmentService } from '../../services/department.service';
import { DoctorService } from '../../services/doctor.service';
import { PatientService } from '../../services/patient.service';
import { AuthService } from '../../core/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatAutocompleteModule, MatDatepickerModule, MatSnackBarModule, MatDialogModule, MatSlideToggleModule, PageHeaderComponent],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent implements OnInit {
  @ViewChild(FormGroupDirective) private formDirective?: FormGroupDirective;
  @HostBinding('class.appointment-editing') get appointmentEditing(): boolean { return this.editingId !== null; }
  appointments: Appointment[] = [];
  departments: Department[] = [];
  doctors: Doctor[] = [];
  patients: Patient[] = [];
  patientSearch = new FormControl<string | null>('');
  form: FormGroup;
  editingId: number | null = null;
  readonly minDate = new Date();
  readonly timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];

  constructor(private fb: FormBuilder, private appointmentService: AppointmentService, private departmentService: DepartmentService, private doctorService: DoctorService, private patientService: PatientService, private snackBar: MatSnackBar, private dialog: MatDialog, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({ departmentId: [null, Validators.required], doctorId: [null, Validators.required], patientId: [null, Validators.required], appointmentDate: [null, Validators.required], appointmentTime: [null, Validators.required], reason: ['', Validators.required], status: ['SCHEDULED'] });
  }

  ngOnInit(): void {
    this.load();
    this.departmentService.getDepartments().subscribe((response) => this.departments = response.data.filter((department) => department.active));
    this.doctorService.getDoctors().subscribe((response) => this.doctors = response.data);
    this.patientService.getPatients().subscribe((response) => this.patients = response.data.filter((patient) => patient.active));
  }
  isDoctor(): boolean { return this.authService.hasRole('DOCTOR'); }
  load(): void { this.appointmentService.getAppointments().subscribe((res) => this.appointments = res.data); }
  get availableDoctors(): Doctor[] {
    const selectedDepartmentId = Number(this.form.value.departmentId);
    return this.doctors.filter((doctor) => Number(doctor.departmentId) === selectedDepartmentId && doctor.active);
  }
  get selectedDepartmentHead(): string | undefined {
    return this.departments.find((department) => Number(department.id) === Number(this.form.value.departmentId))?.departmentHead;
  }
  get filteredPatients(): Patient[] {
    const query = (this.patientSearch.value ?? '').trim().toLowerCase();
    return this.patients.filter((patient) => !query || this.patientLabel(patient).toLowerCase().includes(query));
  }
  isTimeBooked(time: string): boolean { const date = this.toDateString(this.form.value.appointmentDate); return this.appointments.some((appointment) => appointment.id !== this.editingId && appointment.doctorId === this.form.value.doctorId && appointment.appointmentDate === date && appointment.appointmentTime === time && appointment.status !== 'CANCELLED'); }
  onDepartmentChanged(): void { this.form.patchValue({ doctorId: null, appointmentTime: null }); }
  onScheduleChanged(): void { this.form.patchValue({ appointmentTime: null }); }
  onPatientSearchChanged(): void { this.form.patchValue({ patientId: null }); }
  selectPatient(patientId: number): void {
    const patient = this.patients.find((entry) => entry.id === patientId);
    if (!patient) return;
    this.form.patchValue({ patientId });
    this.patientSearch.setValue(this.patientLabel(patient), { emitEvent: false });
  }
  patientLabel(patient: Patient): string { return `${patient.patientId ?? 'Patient'} — ${patient.firstName} ${patient.lastName}`; }
  submit(): void { if (this.form.invalid) { this.form.markAllAsTouched(); this.snackBar.open('Complete the appointment details', 'Close', { duration: 2500 }); return; } const { departmentId, ...value } = this.form.value; const payload: Appointment = { ...value, appointmentDate: this.toDateString(value.appointmentDate) }; const request = this.editingId ? this.appointmentService.updateAppointment(this.editingId, payload) : this.appointmentService.createAppointment(payload); request.subscribe({ next: () => { this.resetForm(); this.patientSearch.reset(''); this.editingId = null; this.load(); this.snackBar.open('Appointment saved', 'Close', { duration: 2500 }); }, error: (error) => this.snackBar.open(error.error?.message ?? 'Unable to save appointment', 'Close', { duration: 3000 }) }); }
  edit(item: Appointment): void { const doctor = this.doctors.find((entry) => entry.id === item.doctorId); const patient = this.patients.find((entry) => entry.id === item.patientId); this.editingId = item.id ?? null; this.form.patchValue({ ...item, departmentId: doctor?.departmentId ?? null, appointmentDate: item.appointmentDate ? new Date(`${item.appointmentDate}T00:00:00`) : null }); this.patientSearch.setValue(patient ? this.patientLabel(patient) : item.patientName ?? ''); }
  complete(item: Appointment, completed: boolean): void {
    if (!completed || !item.id || item.status === 'COMPLETED') return;
    this.appointmentService.completeAppointment(item.id).subscribe({
      next: () => { this.load(); this.snackBar.open('Checkup marked as completed', 'Close', { duration: 2500 }); },
      error: (error) => this.snackBar.open(error.error?.message ?? 'Unable to update appointment', 'Close', { duration: 3000 })
    });
  }
  addPrescription(item: Appointment): void {
    this.router.navigate(['/prescriptions'], { queryParams: { patientId: item.patientId, patientName: item.patientName } });
  }
  delete(item: Appointment): void { const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { title: 'Cancel Appointment', message: 'Cancel this appointment?' } }); dialogRef.afterClosed().subscribe((confirmed) => { if (confirmed && item.id) { this.appointmentService.deleteAppointment(item.id).subscribe(() => { this.load(); this.snackBar.open('Appointment cancelled', 'Close', { duration: 2500 }); }); } }); }
  private toDateString(value: Date | string): string { return value instanceof Date ? value.toISOString().slice(0, 10) : value; }
  private resetForm(): void { this.formDirective?.resetForm({ status: 'SCHEDULED' }); if (!this.formDirective) this.form.reset({ status: 'SCHEDULED' }); }
}
