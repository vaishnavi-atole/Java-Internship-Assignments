import { Injectable } from '@angular/core';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  students: Student[] = [
    {
      id: 1,
      name: 'Vaishnavi',
      email: 'vaishnavi@gmail.com',
      course: 'Java'
    }
  ];

  getStudents(): Student[] {
    return this.students;
  }

  addStudent(student: Student): void {
    this.students.push(student);
  }
}