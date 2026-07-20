import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse, Prescription } from '../models/models';

@Injectable({ providedIn: 'root' })
export class PrescriptionService {
  private readonly apiUrl = `${environment.apiUrl}/prescriptions`;

  constructor(private http: HttpClient) {}

  getPrescriptions(): Observable<ApiResponse<Prescription[]>> {
    return this.http.get<ApiResponse<Prescription[]>>(this.apiUrl);
  }

  createPrescription(payload: Prescription): Observable<ApiResponse<Prescription>> {
    return this.http.post<ApiResponse<Prescription>>(this.apiUrl, payload);
  }

  updatePrescription(id: number, payload: Prescription): Observable<ApiResponse<Prescription>> {
    return this.http.put<ApiResponse<Prescription>>(`${this.apiUrl}/${id}`, payload);
  }

  deletePrescription(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  }
}
