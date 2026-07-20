import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse, Receptionist } from '../models/models';

@Injectable({ providedIn: 'root' })
export class StaffService {
  private readonly apiUrl = `${environment.apiUrl}/staff/receptionists`;

  constructor(private http: HttpClient) {}

  getReceptionists(): Observable<ApiResponse<Receptionist[]>> {
    return this.http.get<ApiResponse<Receptionist[]>>(this.apiUrl);
  }

  createReceptionist(payload: Receptionist): Observable<ApiResponse<Receptionist>> {
    return this.http.post<ApiResponse<Receptionist>>(this.apiUrl, payload);
  }
}
