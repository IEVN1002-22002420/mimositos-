import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
   email: string = '';
  password: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  loginUsuario() {
    const datos = {
      email: this.email,
      password: this.password
    };

    this.auth.login(datos).subscribe(
      (res: any) => {
        alert(res.mensaje);
        if (res.status === 'success') {
          localStorage.setItem('user', JSON.stringify(res.user));
          this.router.navigate(['/inicio']);
        }
      },
      err => alert('Error al intentar iniciar sesión')
    );
  }
}
