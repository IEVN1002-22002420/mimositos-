import { Routes } from '@angular/router';

export default [
  {
    path: 'admin-login',
    loadComponent: () => import('./admin-login/admin-login.component').then(m => m.AdminLoginComponent)
  },
  {
    path: 'admin-materials',
    loadComponent: () => import('./admin-materials/admin-materials.component').then(m => m.AdminMaterialsComponent)
  },
  {
    path: 'adopcion',
    loadComponent: () => import('./adopcion/adopcion.component').then(m => m.AdopcionComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent)
  },
  {
    path: 'catalog3d',
    loadComponent: () => import('./catalog3d/catalog3d.component').then(m => m.Catalog3dComponent)
  },
  {
    path: 'change-password',
    loadComponent: () => import('./change-password/change-password.component').then(m => m.ChangePasswordComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'personalize',
    loadComponent: () => import('./personalize/personalize.component').then(m => m.PersonalizeComponent)
  },
  // {
  //   path: 'principal',
  //   loadComponent: () => import('./principal/principal.component').then(m => m.PrincipalComponent)
  // },
  {
    path: 'recovery',
    loadComponent: () => import('./recovery/recovery.component').then(m => m.RecoveryComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: '',
    redirectTo: 'catalog3d',
    pathMatch: 'full'
  }
] as Routes;
