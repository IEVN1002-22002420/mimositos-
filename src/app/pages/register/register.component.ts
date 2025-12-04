import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  nombre: string = '';
  email: string = '';
  password: string = '';
  password2: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  registrarUsuario() {

    if (this.password !== this.password2) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const datos = {
      nombre: this.nombre,
      email: this.email,
      password: this.password
    };

    this.auth.registrar(datos).subscribe(
      res => {
        alert(res.mensaje);
        if (res.status === 'success') {
          this.router.navigate(['/login']);
        }
      },
      err => alert('Error al registrar usuario')
    );
  }
}