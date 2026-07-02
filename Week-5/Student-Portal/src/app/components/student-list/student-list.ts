import { Component } from '@angular/core';
import { StudentService } from '../../services/student';

@Component({
  selector: 'app-student-list',
  imports: [],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css'
 
})
export class StudentList {

  students: any[] = [];

  constructor(private studentService: StudentService) {
    this.students = this.studentService.getStudents();
  }
}