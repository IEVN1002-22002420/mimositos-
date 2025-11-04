import { Component } from '@angular/core';

import { Router } from '@angular/router';

interface Contact {
  nombre?: string;
  email?: string;
  mensaje?: string;
}

@Component({
  selector: 'app-mimositos',
  standalone: false,
  templateUrl: './mimositos.component.html',
  styleUrl: './mimositos.component.css'
})
export class MimositosComponent {
userEmail: string | null = null;
  currentYear = new Date().getFullYear();

  contact: Contact = {};
  loading = false;
  contactResult: { success: boolean; message: string } | null = null;

  constructor(private router: Router) {
    // Intenta leer email de sesión (localStorage o backend)
    this.userEmail = localStorage.getItem('userEmail') || null;
  }

  goToCatalog() {
    // Redirige a catálogo 3D
    this.router.navigate(['/catalog']);
  }

  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async submitContact() {
    if (!this.contact.nombre || !this.contact.email || !this.contact.mensaje) {
      this.contactResult = { success: false, message: 'Por favor completa todos los campos.' };
      return;
    }

    this.loading = true;
    this.contactResult = null;

    try {
      // POST al backend en Python (ruta: /api/contact)
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.contact),
      });
      const data = await res.json();
      if (res.ok) {
        this.contactResult = { success: true, message: data.message || 'Mensaje enviado. ¡Gracias!' };
        this.contact = {};
      } else {
        this.contactResult = { success: false, message: data.message || 'Ocurrió un problema.' };
      }
    } catch (err) {
      console.error(err);
      this.contactResult = { success: false, message: 'Error de red. Intenta más tarde.' };
    } finally {
      this.loading = false;
    }
  }
}

