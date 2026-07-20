import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../services/report.service';
import { PageHeaderComponent } from '../../shared/page-header/page-header.component';
import { AuthService } from '../../core/authentication/auth.service';

type ReportItem = Record<string, unknown>;
type ReportCard = { key: string; title: string; icon: string; count: number; items: ReportItem[] };

@Component({
  selector: 'app-reports', standalone: true, imports: [CommonModule, PageHeaderComponent],
  templateUrl: './reports.component.html', styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
  reports: Record<string, ReportItem[]> = { appointments: [], doctors: [], patients: [], bills: [] };

  constructor(private reportService: ReportService, private authService: AuthService) {}

  ngOnInit(): void {
    this.reportService.getReports().subscribe((res) => {
      const reportGroups = Object.entries(res.data ?? {}).reduce<Record<string, ReportItem[]>>((groups, [key, value]) => {
        groups[key] = Array.isArray(value) ? value as ReportItem[] : [];
        return groups;
      }, {});
      this.reports = { ...this.reports, ...reportGroups };
    });
  }

  get isDoctor(): boolean { return this.authService.hasRole('DOCTOR'); }
  get subtitle(): string { return this.isDoctor ? 'Your appointments, patients and treatment activity' : 'Operational summaries from current hospital records'; }
  get cards(): ReportCard[] {
    const cards: ReportCard[] = [
      { key: 'appointments', title: 'Appointments', icon: 'event', count: this.reports.appointments?.length ?? 0, items: this.reports.appointments ?? [] },
      { key: 'patients', title: this.isDoctor ? 'My patients' : 'Patients', icon: 'groups', count: this.reports.patients?.length ?? 0, items: this.reports.patients ?? [] },
      { key: 'doctors', title: this.isDoctor ? 'My profile' : 'Doctors', icon: 'medical_services', count: this.reports.doctors?.length ?? 0, items: this.reports.doctors ?? [] }
    ];
    if (!this.isDoctor) cards.push({ key: 'bills', title: 'Bills', icon: 'receipt_long', count: this.reports.bills?.length ?? 0, items: this.reports.bills ?? [] });
    return cards;
  }

  itemTitle(card: ReportCard, item: ReportItem): string {
    if (card.key === 'appointments') return `${item['patientName'] ?? 'Patient'} · ${item['appointmentDate'] ?? ''}`;
    if (card.key === 'patients') return `${item['firstName'] ?? ''} ${item['lastName'] ?? ''}`.trim() || 'Patient';
    if (card.key === 'doctors') return `Dr. ${item['firstName'] ?? ''} ${item['lastName'] ?? ''}`.trim();
    return String(item['billNumber'] ?? 'Invoice');
  }

  itemDetail(card: ReportCard, item: ReportItem): string {
    if (card.key === 'appointments') return `${item['appointmentTime'] ?? ''} · ${item['status'] ?? ''}`;
    if (card.key === 'patients') return `ID ${item['patientId'] ?? ''}`;
    if (card.key === 'doctors') return String(item['specialization'] ?? item['departmentName'] ?? '');
    return `${item['paymentStatus'] ?? 'Pending'} · ${item['totalAmount'] ?? 0}`;
  }
}
