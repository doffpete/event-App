import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { authguardGuard } from './guard/authguard.guard';

import { sessionGuard } from './guard/session.guard';

export const routes: Routes = [
  {
    path: 'home',
    canActivate: [sessionGuard],
    loadComponent: () =>
      import('./pages/home/home.component').then((com) => com.HomeComponent),
  },

  {
    path: 'login',
    canActivate: [sessionGuard],
    loadComponent: () =>
      import('./pages/login/login.component').then((com) => com.LoginComponent),
  },
  {
    path: 'register',
    canActivate: [sessionGuard],
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (com) => com.RegisterComponent
      ),
  },
  {
    path: 'first-page',
    canActivate: [authguardGuard],
    loadComponent: () =>
      import('./pages/first-page/first-page.component').then(
        (com) => com.FirstPageComponent
      ),
  },
 
  {
    path: 'event-ticket-purchase/:id',
    loadComponent: () =>
      import(
        './pages/event-ticket-purchase/event-ticket-purchase.component'
      ).then((com) => com.EventTicketPurchaseComponent),
  },

  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
