import { Routes } from '@angular/router';

import { Home } from './components/home/home';
import { StudentList } from './components/student-list/student-list';
import { AddStudent } from './components/add-student/add-student';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'students', component: StudentList },
  { path: 'add-student', component: AddStudent }
];