import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DepartmentService } from '../../services/department.service';
import { PageHeaderComponent } from '../../shared/page-header/page-header.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { Department } from '../../models/models';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSlideToggleModule, MatSnackBarModule, MatDialogModule, PageHeaderComponent],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css'
})
export class DepartmentsComponent implements OnInit {
  @ViewChild(FormGroupDirective) private formDirective?: FormGroupDirective;
  departments: Department[] = [];
  form: FormGroup;
  editingId: number | null = null;

  constructor(private fb: FormBuilder, private departmentService: DepartmentService, private snackBar: MatSnackBar, private dialog: MatDialog) {
    this.form = this.fb.group({ name: ['', Validators.required], description: [''], departmentHead: [''], active: [true] });
  }

  ngOnInit(): void { this.load(); }

  load(): void { this.departmentService.getDepartments().subscribe((res) => this.departments = res.data); }

  submit(): void {
    if (this.form.invalid) { return; }
    const payload: Department = this.form.value;
    const request = this.editingId ? this.departmentService.updateDepartment(this.editingId, payload) : this.departmentService.createDepartment(payload);
    request.subscribe({ next: () => { this.resetForm(); this.editingId = null; this.load(); this.snackBar.open('Department saved', 'Close', { duration: 2500 }); }, error: () => this.snackBar.open('Unable to save department', 'Close', { duration: 2500 }) });
  }

  edit(item: Department): void { this.editingId = item.id ?? null; this.form.patchValue(item); }
  private resetForm(): void { this.formDirective?.resetForm({ active: true }); if (!this.formDirective) this.form.reset({ active: true }); }

  toggleStatus(item: Department): void {
    if (!item.id) { return; }
    const payload: Department = { ...item, active: !item.active };
    this.departmentService.updateDepartment(item.id, payload).subscribe({
      next: () => {
        this.load();
        this.snackBar.open(`Department marked ${payload.active ? 'active' : 'inactive'}`, 'Close', { duration: 2500 });
      },
      error: () => this.snackBar.open('Unable to update department status', 'Close', { duration: 2500 })
    });
  }

  delete(item: Department): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { title: 'Delete Department', message: 'Remove this department from the system?' } });
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed && item.id) {
        this.departmentService.deleteDepartment(item.id).subscribe(() => { this.load(); this.snackBar.open('Department removed', 'Close', { duration: 2500 }); });
      }
    });
  }
}
