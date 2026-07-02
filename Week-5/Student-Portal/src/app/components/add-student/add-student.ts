import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../services/student';

@Component({
  selector: 'app-add-student',
  imports: [FormsModule],
  templateUrl: './add-student.html',
  styleUrl: './add-student.css'
})
export class AddStudent {

  student = {
    id: 0,
    name: '',
    email: '',
    course: ''
  };

  constructor(private studentService: StudentService) {}

  addStudent() {
    this.studentService.addStudent({ ...this.student });
    alert('Student Added Successfully');

    this.student = {
      id: 0,
      name: '',
      email: '',
      course: ''
    };
  }
}