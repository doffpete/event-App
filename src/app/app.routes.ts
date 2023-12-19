import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((com) => com.HomeComponent),
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((com) => com.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (com) => com.RegisterComponent
      ),
  },
  {
    path: 'first-page',
    loadComponent: () =>
      import('./pages/first-page/first-page.component').then(
        (com) => com.FirstPageComponent
      ),
  },
  {
    path: 'create-event',
    loadComponent: () =>
      import('./pages/create-event/create-event.component').then(
        (com) => com.CreateEventComponent
      ),
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
