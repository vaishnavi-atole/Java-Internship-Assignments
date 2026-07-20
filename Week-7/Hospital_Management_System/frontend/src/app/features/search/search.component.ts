import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SearchService } from '../../services/search.service';
import { PageHeaderComponent } from '../../shared/page-header/page-header.component';

type SearchItem = Record<string, unknown>;
type SearchGroup = { key: string; title: string; icon: string; items: SearchItem[] };

@Component({
  selector: 'app-search', standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatInputModule, MatButtonModule, PageHeaderComponent],
  templateUrl: './search.component.html', styleUrl: './search.component.css'
})
export class SearchComponent {
  query = new FormControl('');
  results: Record<string, SearchItem[]> = { patients: [], doctors: [], appointments: [], departments: [] };
  searched = false;
  loading = false;

  constructor(private searchService: SearchService) {}

  get groups(): SearchGroup[] {
    return [
      { key: 'patients', title: 'Patients', icon: 'groups', items: this.results.patients ?? [] },
      { key: 'appointments', title: 'Appointments', icon: 'event', items: this.results.appointments ?? [] },
      { key: 'doctors', title: 'Doctors', icon: 'medical_services', items: this.results.doctors ?? [] },
      { key: 'departments', title: 'Departments', icon: 'domain', items: this.results.departments ?? [] }
    ].filter((group) => group.items.length > 0);
  }

  search(): void {
    const term = (this.query.value ?? '').trim();
    if (!term) { this.searched = false; this.results = { patients: [], doctors: [], appointments: [], departments: [] }; return; }
    this.loading = true;
    this.searchService.search(term).subscribe({
      next: (res) => {
        this.results = Object.entries(res.data ?? {}).reduce<Record<string, SearchItem[]>>((groups, [key, value]) => {
          groups[key] = Array.isArray(value) ? value as SearchItem[] : [];
          return groups;
        }, { patients: [], doctors: [], appointments: [], departments: [] });
        this.searched = true;
        this.loading = false;
      },
      error: () => { this.searched = true; this.loading = false; this.results = { patients: [], doctors: [], appointments: [], departments: [] }; }
    });
  }

  title(group: SearchGroup, item: SearchItem): string {
    if (group.key === 'patients') return `${item['patientId'] ?? 'Patient'} — ${item['firstName'] ?? ''} ${item['lastName'] ?? ''}`.trim();
    if (group.key === 'appointments') return `${item['patientName'] ?? 'Patient'} · ${item['appointmentDate'] ?? ''}`;
    if (group.key === 'doctors') return `Dr. ${item['firstName'] ?? ''} ${item['lastName'] ?? ''}`.trim();
    return String(item['name'] ?? 'Department');
  }

  detail(group: SearchGroup, item: SearchItem): string {
    if (group.key === 'patients') return `${item['gender'] ?? ''} · ${item['phone'] ?? ''}`;
    if (group.key === 'appointments') return `${item['doctorName'] ?? ''} · ${item['appointmentTime'] ?? ''} · ${item['status'] ?? ''}`;
    if (group.key === 'doctors') return String(item['departmentName'] ?? item['specialization'] ?? '');
    return String(item['departmentHead'] ?? '');
  }
}
