import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

export const sessionGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const auth = inject(SupabaseService);
  const router = inject(Router);
  const access_token = auth.getSessionFromLocalStorage();
  if (access_token) {
    router.navigateByUrl('/first-page');
    return false;
  } else {
    return true;
  }
};
