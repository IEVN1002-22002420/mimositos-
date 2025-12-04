import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface ModelItem {
  id: number;
  nombre: string;
  file: string; // ruta al .glb en assets
  precio?: number;
}

@Component({
  selector: 'app-principal',

  standalone: false,
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {
  cartCount = this.getCartCount();

  contacto = { nombre: '', email: '', mensaje: '' };

  // Modelos (las rutas deben coincidir con la carpeta assets/models)
  modelos: ModelItem[] = [
    { id: 1, nombre: 'Mimosito Gato', file: 'assets/models/gato.glb', precio: 299 },
    { id: 2, nombre: 'Mimosito Osito', file: 'assets/models/OSITO.glb', precio: 299 }
  ];

  tendencias: ModelItem[] = [
    { id: 11, nombre: 'Gato Rosa', file: 'assets/models/GatoRosa.glb' },
    { id: 12, nombre: 'Osito Verde', file: 'assets/models/OSITOVerde.glb' },
    { id: 13, nombre: 'Gato Azul', file: 'assets/models/GatoAzul.glb' },
    { id: 14, nombre: 'Osito Café', file: 'assets/models/OsitoCafe.glb' }
  ];

  constructor(private router: Router) { }

  // CTA para dirigir al catálogo
  irCatalogo() {
    this.router.navigate(['/catalogo']);
  }

  verPersonalizar(modelFile: string) {
    this.router.navigate(['/personalize'], { queryParams: { modelo: modelFile } });
  }

  agregarAlCarrito(item: ModelItem) {
    const carrito = JSON.parse(localStorage.getItem('mimositosCart') || '[]');
    carrito.push({ model: item.file, name: item.nombre, price: item.precio || 299, color: '#FFFFFF', size: 'chico' });
    localStorage.setItem('mimositosCart', JSON.stringify(carrito));
    this.cartCount = carrito.length;
    this.showNotification(`${item.nombre} agregado al carrito`, 'success');
  }

  getCartCount(): number {
    try {
      const c = JSON.parse(localStorage.getItem('mimositosCart') || '[]');
      return Array.isArray(c) ? c.length : 0;
    } catch {
      return 0;
    }
  }

  enviarContacto() {
    // Solo diseño: muestra feedback
    if (!this.contacto.nombre || !this.contacto.email || !this.contacto.mensaje) {
      this.showNotification('Completa todos los campos', 'warning');
      return;
    }
    this.showNotification('Mensaje enviado — te contactaremos en <48hrs', 'info');
    this.contacto = { nombre: '', email: '', mensaje: '' };
  }

  showNotification(message: string, type: 'success' | 'warning' | 'info') {
    const el = document.createElement('div');
    const map = {
      success: { bg: '#d4edda', text: '#155724', border: '#28a745' },
      warning: { bg: '#fff3cd', text: '#856404', border: '#ffc107' },
      info: { bg: '#d1ecf1', text: '#0c5460', border: '#17a2b8' }
    } as any;
    const c = map[type];
    el.style.cssText = `position:fixed; top:20px; right:20px; background:${c.bg}; color:${c.text}; padding:12px 18px; border-left:4px solid ${c.border}; border-radius:8px; z-index:9999; box-shadow:0 6px 18px rgba(0,0,0,0.08)`;
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2800);
  }
}
