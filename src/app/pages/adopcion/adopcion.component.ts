import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adopcion',
  standalone: false,
  templateUrl: './adopcion.component.html',
  styleUrl: './adopcion.component.css'
})
export class AdopcionComponent {
 form = {
    nombre_mimosito: '',
    personalidad: '',
    historia: '',
    especial: ''
  };

  constructor(private http: HttpClient) {}

  enviarAdopcion() {
    this.http.post("http://localhost:5000/api/adopcion", this.form)
      .subscribe({
        next: res => {
          alert("Solicitud enviada correctamente 💖");
          this.form = {
            nombre_mimosito: '',
            personalidad: '',
            historia: '',
            especial: ''
          };
        },
        error: err => {
          console.error(err);
          alert("Hubo un error al enviar la solicitud.");
        }
      });
  }

}

