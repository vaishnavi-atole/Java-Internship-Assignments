import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { MainLayoutComponent } from './layout/main-layout.component';
import { DashboardPageComponent } from './pages/dashboard/dashboard.page';
import { LoginPageComponent } from './pages/login/login.page';
import { NotFoundPageComponent } from './pages/not-found/not-found.page';
import { ProfilePageComponent } from './pages/profile/profile.page';
import { AttendancePageComponent } from './pages/attendance/attendance.page';
import { TeacherCreatePageComponent } from './pages/teacher-create/teacher-create.page';
import { TeacherListPageComponent } from './pages/teacher-list/teacher-list.page';
import { StudentDetailsPageComponent } from './pages/student-details/student-details.page';
import { StudentFormPageComponent } from './pages/student-form/student-form.page';
import { StudentListPageComponent } from './pages/student-list/student-list.page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'login', component: LoginPageComponent },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardPageComponent },
      { path: 'students', component: StudentListPageComponent, canActivate: [authGuard], data: { roles: ['ADMIN', 'TEACHER'] } },
      { path: 'students/new', component: StudentFormPageComponent, canActivate: [authGuard], data: { roles: ['ADMIN'] } },
      { path: 'students/:id/edit', component: StudentFormPageComponent, canActivate: [authGuard], data: { roles: ['ADMIN'] } },
      { path: 'students/:id/attendance', component: AttendancePageComponent, canActivate: [authGuard], data: { roles: ['ADMIN', 'TEACHER'] } },
      { path: 'students/:id', component: StudentDetailsPageComponent, canActivate: [authGuard], data: { roles: ['ADMIN', 'TEACHER'] } },
      { path: 'my-details', component: StudentDetailsPageComponent, canActivate: [authGuard], data: { roles: ['STUDENT'] } },
      { path: 'my-attendance', component: AttendancePageComponent, canActivate: [authGuard], data: { roles: ['STUDENT'] } },
      { path: 'admin/teachers', component: TeacherListPageComponent, canActivate: [authGuard], data: { roles: ['ADMIN'] } },
      { path: 'admin/teachers/new', component: TeacherCreatePageComponent, canActivate: [authGuard], data: { roles: ['ADMIN'] } },
      { path: 'profile', component: ProfilePageComponent }
    ]
  },
  { path: '**', component: NotFoundPageComponent }
];
