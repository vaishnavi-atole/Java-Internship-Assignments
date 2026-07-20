import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PrescriptionService } from '../../services/prescription.service';
import { PageHeaderComponent } from '../../shared/page-header/page-header.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { Prescription } from '../../models/models';
import { AuthService } from '../../core/authentication/auth.service';
import { DoctorService } from '../../services/doctor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prescriptions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule, MatDialogModule, PageHeaderComponent],
  templateUrl: './prescriptions.component.html',
  styleUrl: './prescriptions.component.css'
})
export class PrescriptionsComponent implements OnInit {
  @ViewChild(FormGroupDirective) private formDirective?: FormGroupDirective;
  prescriptions: Prescription[] = [];
  form: FormGroup;
  editingId: number | null = null;
  selectedPatientName = '';

  constructor(private fb: FormBuilder, private prescriptionService: PrescriptionService, private snackBar: MatSnackBar, private dialog: MatDialog, private authService: AuthService, private doctorService: DoctorService, private route: ActivatedRoute) {
    this.form = this.fb.group({ prescriptionNumber: [''], doctorId: [null, Validators.required], patientId: [null, Validators.required], medicine: ['', Validators.required], dosage: ['', Validators.required], duration: ['', Validators.required], instructions: [''], visitDate: [''] });
  }

  ngOnInit(): void {
    this.load();
    const patientId = Number(this.route.snapshot.queryParamMap.get('patientId'));
    this.selectedPatientName = this.route.snapshot.queryParamMap.get('patientName') ?? '';
    if (patientId) this.form.patchValue({ patientId });
    if (this.canManage()) this.doctorService.getDoctors().subscribe((response) => this.form.patchValue({ doctorId: response.data[0]?.id }));
  }
  canManage(): boolean { return this.authService.hasRole('DOCTOR'); }
  load(): void { this.prescriptionService.getPrescriptions().subscribe((res) => this.prescriptions = res.data); }
  submit(): void { if (this.form.invalid) { this.form.markAllAsTouched(); return; } const payload: Prescription = this.form.value; const request = this.editingId ? this.prescriptionService.updatePrescription(this.editingId, payload) : this.prescriptionService.createPrescription(payload); request.subscribe({ next: () => { this.resetForm(); this.editingId = null; this.load(); this.snackBar.open('Prescription saved', 'Close', { duration: 2500 }); }, error: () => this.snackBar.open('Unable to save prescription', 'Close', { duration: 2500 }) }); }
  edit(item: Prescription): void { this.editingId = item.id ?? null; this.form.patchValue(item); }
  private resetForm(): void { this.formDirective?.resetForm(); if (!this.formDirective) this.form.reset(); }
  delete(item: Prescription): void { const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { title: 'Delete Prescription', message: 'Remove this prescription record?' } }); dialogRef.afterClosed().subscribe((confirmed) => { if (confirmed && item.id) { this.prescriptionService.deletePrescription(item.id).subscribe(() => { this.load(); this.snackBar.open('Prescription removed', 'Close', { duration: 2500 }); }); } }); }
}
