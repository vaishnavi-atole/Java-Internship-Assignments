import { NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MATERIAL_IMPORTS } from '../../shared/material.imports';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/auth.model';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog.component';

@Component({
  selector: 'app-teacher-list-page',
  standalone: true,
  imports: [NgIf, RouterLink, ...MATERIAL_IMPORTS],
  templateUrl: './teacher-list.page.html',
  styleUrl: './teacher-list.page.css'
})
export class TeacherListPageComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly dialog = inject(MatDialog);

  displayedColumns = ['id', 'name', 'email', 'role', 'actions'];
  teachers: User[] | null = null;
  deletingId: number | null = null;

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.authService.getTeacherAccounts().subscribe((teachers) => (this.teachers = teachers));
  }

  deleteTeacher(teacher: User): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete teacher?',
        message: `This will permanently delete ${teacher.name}'s login account. Attendance they marked will remain in the system.`,
        confirmText: 'Delete teacher',
        cancelText: 'Keep teacher',
        tone: 'danger'
      }
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) {
        return;
      }

      this.deletingId = teacher.id;
      this.authService.deleteTeacherAccount(teacher.id).subscribe({
        next: () => {
          this.teachers = this.teachers?.filter((item) => item.id !== teacher.id) ?? [];
          this.deletingId = null;
          this.snackBar.open('Teacher deleted successfully.', 'Close', {
            duration: 3000,
            panelClass: ['snack-success']
          });
        },
        error: (error) => {
          this.deletingId = null;
          this.snackBar.open(error.error?.message ?? 'Teacher could not be deleted.', 'Close', {
            duration: 3500,
            panelClass: ['snack-error']
          });
        }
      });
    });
  }
}
