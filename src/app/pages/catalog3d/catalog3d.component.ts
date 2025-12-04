import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Product {
  id: string;
  model: string;
  name: string;
  price: number;
}

@Component({
  selector: 'app-catalog3d',
  standalone: false,
  templateUrl: './catalog3d.component.html',
  styleUrl: './catalog3d.component.css'
})
export class Catalog3dComponent implements OnInit {
  products: Product[] = [
    {
      id: '1',
      model: 'assets/models/gato.glb',
      name: 'Mimosito Gato',
      price: 299
    },
    {
      id: '2',
      model: 'assets/models/OSITO.glb',
      name: 'Mimosito Osito',
      price: 299
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadModelViewer();
  }

  loadModelViewer(): void {
    if (!customElements.get('model-viewer')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js';
      document.head.appendChild(script);
    }
  }

  verEnTuEspacio(modelo: string): void {
    console.log('Personalizar modelo:', modelo);
    console.log('Navegando a /personalize con modelo:', modelo);
    
    this.router.navigate(['/personalize'], {
      queryParams: { modelo: modelo }
    }).then(success => {
      console.log('Navegación exitosa:', success);
    }).catch(error => {
      console.error('Error en navegación:', error);
    });
  }

  agregarCarrito(producto: Product): void {
    const carrito = this.getCarrito();
    carrito.push({
      model: producto.model,
      name: producto.name,
      price: producto.price,
      color: '#FFFFFF',
      size: 1
    });
    localStorage.setItem('mimositosCart', JSON.stringify(carrito));
    this.showNotification(`${producto.name} agregado al carrito`, 'success');
  }

  private getCarrito(): any[] {
    const carritoStr = localStorage.getItem('mimositosCart');
    return carritoStr ? JSON.parse(carritoStr) : [];
  }

  private showNotification(message: string, type: 'success' | 'warning' | 'info'): void {
    const notification = document.createElement('div');
    const colors = {
      success: { bg: '#d4edda', text: '#155724', border: '#28a745' },
      warning: { bg: '#fff3cd', text: '#856404', border: '#ffc107' },
      info: { bg: '#d1ecf1', text: '#0c5460', border: '#17a2b8' }
    };
    const color = colors[type];
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${color.bg};
      color: ${color.text};
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 1000;
      font-weight: 500;
      border-left: 4px solid ${color.border};
      animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}