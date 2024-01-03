import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { of } from 'rxjs';

export const permissionsGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const auth = inject(SupabaseService);
  const router = inject(Router);
  
};
