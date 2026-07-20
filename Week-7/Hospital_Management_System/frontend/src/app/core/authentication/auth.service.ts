import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../models/models';

export interface LoginRequest { username: string; password: string; }
export interface AuthResponse { token: string; username: string; role: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  readonly isLoggedIn = signal(false);

  constructor(private http: HttpClient, private router: Router) {
    this.isLoggedIn.set(!!this.getToken());
  }

  login(payload: LoginRequest): Observable<AuthResponse> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/auth/login`, payload).pipe(
      tap((response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('role', response.data.role);
        this.isLoggedIn.set(true);
      }),
      // Keep the service contract focused on the authentication payload, rather
      // than leaking the API response envelope into the UI.
      map((response) => response.data)
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    document.body.classList.remove('role-admin', 'role-doctor', 'role-receptionist');
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): string {
    return localStorage.getItem('username') ?? 'User';
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  getRole(): string { return localStorage.getItem('role') ?? ''; }
  hasRole(...roles: string[]): boolean { return roles.includes(this.getRole()); }
  dashboardRoute(): string {
    if (this.getRole() === 'DOCTOR') return '/doctor-dashboard';
    if (this.getRole() === 'RECEPTIONIST') return '/reception-dashboard';
    return '/dashboard';
  }
}
