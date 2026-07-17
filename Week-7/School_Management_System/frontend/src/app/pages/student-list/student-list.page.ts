import { NgIf } from '@angular/common';
import { Component, ViewChild, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MATERIAL_IMPORTS } from '../../shared/material.imports';
import { StudentService } from '../../services/student.service';
import { PageResult } from '../../models/page.model';
import { Student } from '../../models/student.model';
import { AuthService } from '../../services/auth.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog.component';

@Component({
  selector: 'app-student-list-page',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, RouterLink, ...MATERIAL_IMPORTS],
  templateUrl: './student-list.page.html',
  styleUrl: './student-list.page.css'
})
export class StudentListPageComponent implements OnInit {
  private readonly studentService = inject(StudentService);
  readonly authService = inject(AuthService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  displayedColumns = ['studentId', 'name', 'email', 'department', 'course', 'actions'];
  searchControl = new FormControl('');
  page: PageResult<Student> | null = null;
  deletingId: number | null = null;

  params = { keyword: '', page: 0, size: 10, sortBy: 'createdAt', sortDir: 'desc' };

  ngOnInit(): void {
    this.loadStudents();
    this.searchControl.valueChanges.pipe(debounceTime(350), distinctUntilChanged()).subscribe((value) => {
      this.params.keyword = value ?? '';
      this.params.page = 0;
      this.loadStudents();
    });
  }

  loadStudents(): void {
    this.studentService.getStudents(this.params).subscribe((page) => (this.page = page));
  }

  pageChanged(event: { pageIndex: number; pageSize: number }): void {
    this.params.page = event.pageIndex;
    this.params.size = event.pageSize;
    this.loadStudents();
  }

  sortChanged(event: { active: string; direction: string }): void {
    this.params.sortBy = event.active;
    this.params.sortDir = event.direction || 'asc';
    this.loadStudents();
  }

  remove(student: Student): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete student?',
        message: `This will permanently delete ${student.firstName} ${student.lastName}, their login account, and related attendance records.`,
        confirmText: 'Delete student',
        cancelText: 'Keep student',
        tone: 'danger'
      }
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) {
        return;
      }

      this.deletingId = student.id;
      this.studentService.deleteStudent(student.id).subscribe({
        next: () => {
          this.deletingId = null;
          this.snackBar.open('Student deleted successfully.', 'Close', {
            duration: 3000,
            panelClass: ['snack-success']
          });
          this.loadStudents();
        },
        error: (error) => {
          this.deletingId = null;
          this.snackBar.open(error.error?.message ?? 'Student could not be deleted.', 'Close', {
            duration: 3500,
            panelClass: ['snack-error']
          });
        }
      });
    });
  }
}
