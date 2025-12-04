import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.routes').then((m) => m.default),
  },
  {
    path: '',
    redirectTo: 'pages/principal',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'pages/principal'
  }
];
