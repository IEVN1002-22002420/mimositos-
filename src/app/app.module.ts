import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CartComponent } from './pages/cart/cart.component';
import { AdopcionComponent } from './pages/adopcion/adopcion.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { InventoryComponent } from './admin/inventory/inventory.component';
import { AdminMaterialsComponent } from './pages/admin-materials/admin-materials.component';
import { PrincipalComponent } from './principal/principal.component';
import { Catalog3dComponent } from './pages/catalog3d/catalog3d.component';
import { PersonalizeComponent } from './pages/personalize/personalize.component';
import { InventoryadminComponent } from './pages/inventoryadmin/inventoryadmin.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    RecoveryComponent,
    ChangePasswordComponent,
    ContactComponent,
    CartComponent,
    AdopcionComponent,
    AdminLoginComponent,
    InventoryComponent,
    AdminMaterialsComponent,
    PrincipalComponent,
    Catalog3dComponent,
    PersonalizeComponent,
    InventoryadminComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // ← ESTO es importante
})
export class AppModule { }