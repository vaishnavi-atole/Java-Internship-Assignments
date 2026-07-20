import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Appointment } from '../../models/models';
import { Prescription } from '../../models/models';

export interface PatientHistoryDialogData {
  patientName: string;
  patientId: string;
  appointments: Appointment[];
  prescriptions: Prescription[];
}

@Component({
  selector: 'app-patient-history-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <div class="history-title" mat-dialog-title>
      <span class="material-icons">history</span>
      <div><span>Visit history</span><strong>{{ data.patientName }}</strong><small>{{ data.patientId }}</small></div>
    </div>
    <mat-dialog-content>
      <section class="medicine-section" *ngIf="data.prescriptions.length">
        <span class="medicine-label">Prescribed medicines</span>
        <div class="medicine-list"><span *ngFor="let prescription of data.prescriptions">{{ prescription.medicine }}</span></div>
      </section>
      <div class="history-list" *ngIf="data.appointments.length; else noHistory">
        <article class="history-entry" *ngFor="let appointment of data.appointments">
          <div class="history-date"><strong>{{ appointment.appointmentDate | date:'mediumDate' }}</strong><span>{{ appointment.appointmentTime }}</span></div>
          <div><span class="history-status">{{ appointment.status }}</span><p>{{ appointment.reason || 'No reason recorded' }}</p></div>
        </article>
      </div>
      <ng-template #noHistory><div class="history-empty"><span class="material-icons">event_busy</span>No completed or past visits are available.</div></ng-template>
    </mat-dialog-content>
    <mat-dialog-actions align="end"><button mat-button mat-dialog-close>Close</button></mat-dialog-actions>
  `,
  styles: [`
    .history-title { display:flex; align-items:center; gap:.8rem; }.history-title > .material-icons { padding:.6rem; border-radius:12px; color:var(--primary); background:color-mix(in srgb, var(--primary) 12%, transparent); }.history-title div { display:grid; gap:.08rem; }.history-title span:not(.material-icons) { color:var(--primary); font-size:.67rem; font-weight:800; letter-spacing:.09em; text-transform:uppercase; }.history-title strong { color:var(--ink); font-size:1.05rem; }.history-title small { color:var(--muted); }.medicine-section { margin:0 0 1rem; padding:.85rem; border:1px solid var(--line); border-radius:13px; background:var(--surface-soft); }.medicine-label { display:block; margin-bottom:.55rem; color:var(--primary); font-size:.68rem; font-weight:800; letter-spacing:.08em; text-transform:uppercase; }.medicine-list { display:flex; flex-wrap:wrap; gap:.45rem; }.medicine-list span { padding:.36rem .6rem; border-radius:999px; color:var(--ink); background:color-mix(in srgb, var(--primary) 12%, transparent); font-size:.78rem; font-weight:700; }.history-list { display:grid; gap:.7rem; min-width:min(500px, 72vw); }.history-entry { display:grid; grid-template-columns:150px 1fr; gap:1rem; padding:.9rem; border:1px solid var(--line); border-radius:13px; background:var(--surface-soft); }.history-date { display:grid; align-content:start; gap:.18rem; color:var(--ink); }.history-date span, .history-entry p { margin:.35rem 0 0; color:var(--muted); font-size:.82rem; }.history-status { display:inline-flex; padding:.3rem .55rem; border-radius:999px; color:var(--primary); background:color-mix(in srgb, var(--primary) 12%, transparent); font-size:.66rem; font-weight:800; letter-spacing:.05em; }.history-empty { display:flex; align-items:center; gap:.5rem; min-width:320px; padding:1.5rem 0; color:var(--muted); } @media(max-width:550px){.history-list{min-width:0}.history-entry{grid-template-columns:1fr;gap:.35rem}}
  `]
})
export class PatientHistoryDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: PatientHistoryDialogData) {}
}
