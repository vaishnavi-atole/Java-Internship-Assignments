import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './core/authentication/login/login.component';
import { ForgotPasswordComponent } from './core/authentication/forgot-password/forgot-password.component';
import { LayoutComponent } from './core/layout/layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { DepartmentsComponent } from './features/departments/departments.component';
import { DoctorsComponent } from './features/doctors/doctors.component';
import { PatientsComponent } from './features/patients/patients.component';
import { AppointmentsComponent } from './features/appointments/appointments.component';
import { PrescriptionsComponent } from './features/prescriptions/prescriptions.component';
import { BillingComponent } from './features/billing/billing.component';
import { ReportsComponent } from './features/reports/reports.component';
import { SettingsComponent } from './features/settings/settings.component';
import { SearchComponent } from './features/search/search.component';
import { StaffComponent } from './features/staff/staff.component';
import { DoctorProfileComponent } from './features/doctor-profile/doctor-profile.component';
import { AdminGuard } from './core/guards/admin.guard';
import { RoleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, canActivate: [RoleGuard], data: { roles: ['ADMIN'] } },
      { path: 'doctor-dashboard', component: DashboardComponent, canActivate: [RoleGuard], data: { roles: ['DOCTOR'] } },
      { path: 'reception-dashboard', component: DashboardComponent, canActivate: [RoleGuard], data: { roles: ['RECEPTIONIST'] } },
      { path: 'departments', component: DepartmentsComponent, canActivate: [RoleGuard], data: { roles: ['ADMIN'] } },
      { path: 'doctors', component: DoctorsComponent, canActivate: [RoleGuard], data: { roles: ['ADMIN'] } },
      { path: 'profile', component: DoctorProfileComponent, canActivate: [RoleGuard], data: { roles: ['DOCTOR'] } },
      { path: 'patients', component: PatientsComponent, canActivate: [RoleGuard], data: { roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST'] } },
      { path: 'appointments', component: AppointmentsComponent, canActivate: [RoleGuard], data: { roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST'] } },
      { path: 'prescriptions', component: PrescriptionsComponent, canActivate: [RoleGuard], data: { roles: ['ADMIN', 'DOCTOR'] } },
      { path: 'billing', component: BillingComponent, canActivate: [RoleGuard], data: { roles: ['ADMIN', 'RECEPTIONIST'] } },
      { path: 'reports', component: ReportsComponent, canActivate: [RoleGuard], data: { roles: ['ADMIN', 'DOCTOR'] } },
      { path: 'settings', component: SettingsComponent, canActivate: [RoleGuard], data: { roles: ['ADMIN'] } },
      { path: 'staff', component: StaffComponent, canActivate: [AdminGuard] },
      { path: 'search', component: SearchComponent, canActivate: [RoleGuard], data: { roles: ['ADMIN', 'RECEPTIONIST'] } }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
