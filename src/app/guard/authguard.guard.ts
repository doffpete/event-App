import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { inject } from '@angular/core';
import { of } from 'rxjs';

export const authguardGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const auth = inject(SupabaseService);
  const router = inject(Router);
  if (auth.getSessionFromLocalStorage()) {
    return of(true);
  } else {
    return router.navigate(['/login']);
  }
};
