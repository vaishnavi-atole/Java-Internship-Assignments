import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse, Bill } from '../models/models';

@Injectable({ providedIn: 'root' })
export class BillingService {
  private readonly apiUrl = `${environment.apiUrl}/bills`;

  constructor(private http: HttpClient) {}

  getBills(): Observable<ApiResponse<Bill[]>> {
    return this.http.get<ApiResponse<Bill[]>>(this.apiUrl);
  }

  createBill(payload: Bill): Observable<ApiResponse<Bill>> {
    return this.http.post<ApiResponse<Bill>>(this.apiUrl, payload);
  }

  updateBill(id: number, payload: Bill): Observable<ApiResponse<Bill>> {
    return this.http.put<ApiResponse<Bill>>(`${this.apiUrl}/${id}`, payload);
  }

  deleteBill(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  }
}
