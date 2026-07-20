import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse, Doctor, PhotoUpload } from '../models/models';

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private readonly apiUrl = `${environment.apiUrl}/doctors`;

  constructor(private http: HttpClient) {}

  getDoctors(): Observable<ApiResponse<Doctor[]>> {
    return this.http.get<ApiResponse<Doctor[]>>(this.apiUrl);
  }

  createDoctor(payload: Doctor): Observable<ApiResponse<Doctor>> {
    return this.http.post<ApiResponse<Doctor>>(this.apiUrl, payload);
  }

  updateDoctor(id: number, payload: Doctor): Observable<ApiResponse<Doctor>> {
    return this.http.put<ApiResponse<Doctor>>(`${this.apiUrl}/${id}`, payload);
  }

  deleteDoctor(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  }

  uploadDoctorPhoto(file: File): Observable<ApiResponse<PhotoUpload>> {
    const body = new FormData();
    body.append('file', file);
    return this.http.post<ApiResponse<PhotoUpload>>(`${environment.apiUrl}/uploads/doctor-photo`, body);
  }
}
