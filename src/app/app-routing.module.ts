import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { Catalog3dComponent } from './pages/catalog3d/catalog3d.component';
import { CartComponent } from './pages/cart/cart.component';
import { PersonalizeComponent } from './pages/personalize/personalize.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { InventoryadminComponent } from './pages/inventoryadmin/inventoryadmin.component';

const routes: Routes = [
  { path: '', redirectTo: '/principal', pathMatch: 'full' },
  { path: 'principal', component: PrincipalComponent },
  { path: 'catalogo', component: Catalog3dComponent },
  { path: 'catalogo3d', component: Catalog3dComponent }, // alias para compatibilidad
  { path: 'carrito', component: CartComponent },
  { path: 'personalize', component: PersonalizeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: "admin", component: AdminLoginComponent },
  { path: 'admin/inventario', component: InventoryadminComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
