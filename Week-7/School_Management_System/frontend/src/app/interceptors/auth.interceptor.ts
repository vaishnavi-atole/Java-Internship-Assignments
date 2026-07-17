import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);
  const token = authService.getToken();
  const isAuthEndpoint = request.url.includes('/auth/login') || request.url.includes('/auth/register');
  const authRequest = token
    ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : request;

  return next(authRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !isAuthEndpoint) {
        authService.logout();
        router.navigate(['/login'], { queryParams: { reason: 'expired' } });
      }
      if (error.status === 403) {
        snackBar.open('You do not have permission to perform this action.', 'Close', {
          duration: 3500,
          panelClass: ['snack-error']
        });
        router.navigate(['/dashboard']);
      }
      return throwError(() => error);
    })
  );
};
