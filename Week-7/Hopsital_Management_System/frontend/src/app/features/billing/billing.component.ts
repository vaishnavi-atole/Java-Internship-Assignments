import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BillingService } from '../../services/billing.service';
import { PageHeaderComponent } from '../../shared/page-header/page-header.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { Bill, Patient } from '../../models/models';
import { AuthService } from '../../core/authentication/auth.service';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatAutocompleteModule, MatSlideToggleModule, MatSnackBarModule, MatDialogModule, PageHeaderComponent],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css'
})
export class BillingComponent implements OnInit {
  @ViewChild(FormGroupDirective) private formDirective?: FormGroupDirective;
  bills: Bill[] = [];
  patients: Patient[] = [];
  patientSearch = new FormControl<string | null>('');
  form: FormGroup;
  editingId: number | null = null;
  expandedBillId: number | null = null;

  constructor(private fb: FormBuilder, private billingService: BillingService, private patientService: PatientService, private snackBar: MatSnackBar, private dialog: MatDialog, private authService: AuthService) {
    this.form = this.fb.group({ billNumber: [''], patientId: [null, Validators.required], consultationFee: [0], medicineFee: [0], labFee: [0], discount: [0], gst: [0], paymentStatus: ['PENDING'] });
  }

  ngOnInit(): void { this.load(); if (this.canManage()) this.patientService.getPatients().subscribe((res) => this.patients = res.data.filter((patient) => patient.active)); }
  canManage(): boolean { return this.authService.hasRole('RECEPTIONIST'); }
  load(): void { this.billingService.getBills().subscribe((res) => this.bills = res.data); }
  get filteredPatients(): Patient[] {
    const query = (this.patientSearch.value ?? '').trim().toLowerCase();
    return this.patients.filter((patient) => !query || this.patientLabel(patient).toLowerCase().includes(query));
  }
  patientLabel(patient: Patient): string { return `${patient.patientId ?? 'Patient'} — ${patient.firstName} ${patient.lastName}`; }
  onPatientSearchChanged(): void { this.form.patchValue({ patientId: null }); }
  selectPatient(patientId: number): void {
    const patient = this.patients.find((entry) => entry.id === patientId);
    if (!patient) return;
    this.form.patchValue({ patientId });
    this.patientSearch.setValue(this.patientLabel(patient), { emitEvent: false });
  }
  submit(): void { if (this.form.invalid) { return; } const payload: Bill = this.form.value; const request = this.editingId ? this.billingService.updateBill(this.editingId, payload) : this.billingService.createBill(payload); request.subscribe({ next: () => { this.resetForm(); this.editingId = null; this.load(); this.snackBar.open('Bill saved', 'Close', { duration: 2500 }); }, error: () => this.snackBar.open('Unable to save bill', 'Close', { duration: 2500 }) }); }
  edit(item: Bill): void { this.editingId = item.id ?? null; this.form.patchValue(item); const patient = this.patients.find((entry) => entry.id === item.patientId); this.patientSearch.setValue(patient ? this.patientLabel(patient) : item.patientName ?? ''); }
  setPaid(item: Bill, paid: boolean): void {
    if (!item.id) return;
    const payload: Bill = { billNumber: item.billNumber, patientId: item.patientId, consultationFee: item.consultationFee, medicineFee: item.medicineFee, labFee: item.labFee, discount: item.discount, gst: item.gst, paymentStatus: paid ? 'PAID' : 'PENDING' };
    this.billingService.updateBill(item.id, payload).subscribe({
      next: () => { this.load(); this.snackBar.open(paid ? 'Bill marked as paid' : 'Bill marked as pending', 'Close', { duration: 2500 }); },
      error: (error) => { this.load(); this.snackBar.open(error.error?.message ?? 'Unable to update payment status', 'Close', { duration: 3000 }); }
    });
  }
  toggleBreakdown(item: Bill): void { this.expandedBillId = this.expandedBillId === item.id ? null : item.id ?? null; }
  private resetForm(): void { this.formDirective?.resetForm({ paymentStatus: 'PENDING' }); if (!this.formDirective) this.form.reset({ paymentStatus: 'PENDING' }); this.patientSearch.reset(''); }
  delete(item: Bill): void { const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { title: 'Delete Bill', message: 'Remove this billing record?' } }); dialogRef.afterClosed().subscribe((confirmed) => { if (confirmed && item.id) { this.billingService.deleteBill(item.id).subscribe(() => { this.load(); this.snackBar.open('Bill removed', 'Close', { duration: 2500 }); }); } }); }
}
