import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PageHeaderComponent } from '../../shared/page-header/page-header.component';
import { Receptionist } from '../../models/models';
import { StaffService } from '../../services/staff.service';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, PageHeaderComponent],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.css'
})
export class StaffComponent implements OnInit {
  @ViewChild(FormGroupDirective) private formDirective?: FormGroupDirective;
  receptionists: Receptionist[] = [];
  form: FormGroup;

  constructor(private fb: FormBuilder, private staffService: StaffService, private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      firstName: ['', Validators.required], lastName: ['', Validators.required], username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]], password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void { this.load(); }

  load(): void { this.staffService.getReceptionists().subscribe({ next: (response) => this.receptionists = response.data, error: () => this.snackBar.open('Unable to load receptionists', 'Close', { duration: 2500 }) }); }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.staffService.createReceptionist(this.form.value).subscribe({
      next: () => { this.formDirective?.resetForm(); if (!this.formDirective) this.form.reset(); this.load(); this.snackBar.open('Receptionist account created', 'Close', { duration: 2500 }); },
      error: (error) => this.snackBar.open(error.error?.message ?? 'Unable to create receptionist', 'Close', { duration: 3000 })
    });
  }
}
