import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const requiredRoles = route.data['roles'] as string[] | undefined;

  if (!authService.isAuthenticated()) {
    authService.logout();
    return router.createUrlTree(['/login'], {
      queryParams: { returnUrl: route.url.map((segment) => segment.path).join('/') }
    });
  }

  if (requiredRoles?.length && !requiredRoles.includes(authService.getUserSnapshot()?.role ?? '')) {
    return router.createUrlTree(['/dashboard']);
  }

  return true;
};
