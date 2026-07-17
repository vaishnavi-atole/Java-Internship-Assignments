import { DatePipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MATERIAL_IMPORTS } from '../../shared/material.imports';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-student-details-page',
  standalone: true,
  imports: [DatePipe, NgIf, RouterLink, ...MATERIAL_IMPORTS],
  templateUrl: './student-details.page.html',
  styleUrl: './student-details.page.css'
})
export class StudentDetailsPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly studentService = inject(StudentService);
  private readonly authService = inject(AuthService);
  readonly isStudent = this.authService.hasRole('STUDENT');
  student: Student | null = null;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const request = this.isStudent ? this.studentService.getMe() : this.studentService.getStudent(id);
    request.subscribe((student) => (this.student = student));
  }
}
