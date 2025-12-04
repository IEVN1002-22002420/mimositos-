import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: false,
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
    
  admin = {
    email: '',
    admin_id: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  loginAdmin() {
    this.http.post('http://localhost:5000/admin/login', this.admin)
      .subscribe(
        (response: any) => {
          if (response.status === 'success') {
            localStorage.setItem('adminToken', response.token);
            this.router.navigate(['/admin-panel']);
          }
        },
        error => {
          alert('Credenciales incorrectas');
        }
      );
  }
}

