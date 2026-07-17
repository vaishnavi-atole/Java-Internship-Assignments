import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Attendance, AttendanceRequest } from '../models/attendance.model';

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  private readonly http = inject(HttpClient);

  getForStudent(studentId: number): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${environment.apiUrl}/attendance/students/${studentId}`);
  }

  getMine(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${environment.apiUrl}/attendance/me`);
  }

  mark(studentId: number, request: AttendanceRequest): Observable<Attendance> {
    return this.http.put<Attendance>(`${environment.apiUrl}/attendance/students/${studentId}`, request);
  }
}
