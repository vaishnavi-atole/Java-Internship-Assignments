import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { DashboardService } from '../../services/dashboard.service';
import { PageHeaderComponent } from '../../shared/page-header/page-header.component';
import { DashboardSummary } from '../../models/models';
import { AuthService } from '../../core/authentication/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, PageHeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  summary: DashboardSummary = { totalPatients: 0, totalDoctors: 0, totalDepartments: 0, todayAppointments: 0, monthlyAppointments: [] };
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{ data: [], label: 'Appointments', backgroundColor: '#0c6e99', borderRadius: 8, borderSkipped: false }]
  };
  public barChartOptions: ChartConfiguration<'bar'>['options'] = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { precision: 0 } }, x: { grid: { display: false } } } };

  constructor(private dashboardService: DashboardService, private authService: AuthService) {}

  get role(): string { return this.authService.getRole(); }
  get dashboardTitle(): string { return this.role === 'DOCTOR' ? 'Doctor Dashboard' : this.role === 'RECEPTIONIST' ? 'Reception Dashboard' : 'Admin Dashboard'; }
  get dashboardSubtitle(): string { return this.role === 'DOCTOR' ? 'Your appointments, patients and clinical activity' : this.role === 'RECEPTIONIST' ? 'Today’s front desk activity and scheduling' : 'A clear view of today’s hospital operations'; }
  get metricLabels(): string[] {
    if (this.role === 'DOCTOR') return ["Today's patients", "Today's appointments", 'Assigned departments', 'Pending consultations'];
    if (this.role === 'RECEPTIONIST') return ["Today's registrations", 'Available doctors', "Today's appointments", 'Registered patients'];
    return ['Total patients', 'Active doctors', 'Departments', "Today's appointments"];
  }
  get metricValues(): number[] {
    if (this.role === 'DOCTOR') return [this.summary.totalPatients, this.summary.todayAppointments, this.summary.totalDepartments, this.summary.pendingConsultations ?? 0];
    if (this.role === 'RECEPTIONIST') return [this.summary.totalPatients, this.summary.totalDoctors, this.summary.todayAppointments, this.summary.totalPatients];
    return [this.summary.totalPatients, this.summary.totalDoctors, this.summary.totalDepartments, this.summary.todayAppointments];
  }

  ngOnInit(): void {
    this.dashboardService.getSummary().subscribe((response) => {
      this.summary = response.data;
      this.barChartData = {
        labels: response.data.monthlyAppointments.map((month) => month.label),
        datasets: [{ data: response.data.monthlyAppointments.map((month) => month.count), label: 'Appointments', backgroundColor: '#0c6e99', borderRadius: 8, borderSkipped: false }]
      };
    });
  }
}
