
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface ColorInfo {
  file: string;
  hex: string;
}

interface ColorMapping {
  [key: string]: {
    [color: string]: ColorInfo;
  };
}

interface OutfitMapping {
  [key: string]: {
    [outfit: string]: string;
  };
}

interface CartItem {
  model: string;
  name: string;
  color: string;
  outfit: string;
  size: number;
  price: number;
  animal: string;
}
@Component({
  selector: 'app-personalize',
  standalone: false,
  templateUrl: './personalize.component.html',
  styleUrl: './personalize.component.css'
})
export class PersonalizeComponent {
   currentColor: string = 'gris';
  currentAnimal: string = 'gato';
  currentOutfit: string = 'sin-ropa';
  currentSize: number = 1;
  pageTitle: string = '';
  statusMessage: string = 'Selecciona un color y ropa para personalizar tu Mimosito';
  
  colorViewerSrc: string = '';
  outfitViewerSrc: string = '';
  
  showGorroOption: boolean = true;
  loadingColor: boolean = true;
  loadingOutfit: boolean = true;

  colors = [
    { name: 'gris', hex: '#808080', title: 'Gris (Por defecto)' },
    { name: 'rosa', hex: '#FF80AB', title: 'Rosa' },
    { name: 'azul', hex: '#90CAF9', title: 'Azul' },
    { name: 'verde', hex: '#A5D6A7', title: 'Verde' },
    { name: 'naranja', hex: '#FFCC80', title: 'Naranja' },
    { name: 'morado', hex: '#CE93D8', title: 'Morado' },
    { name: 'amarillo', hex: '#FFF59D', title: 'Amarillo' },
    { name: 'cafe', hex: '#BCAAA4', title: 'Café' }
  ];

  outfits = [
    { name: 'sin-ropa', title: 'Sin Ropa', class: 'sin-ropa' },
    { name: 'conjunto-invierno', title: 'Conjunto Invierno', class: 'conjunto-invierno' },
    { name: 'gorro', title: 'Gorro', class: 'gorro' },
    { name: 'gorro-base', title: 'Gorro Base', class: 'gorro-base' },
    { name: 'overol', title: 'Overol', class: 'overol' },
    { name: 'smoking', title: 'Smoking', class: 'smoking' }
  ];

  colorMapping: ColorMapping = {
    'gato': {
      'gris': { file: 'assets/models/gato.glb', hex: '#808080' },
      'rosa': { file: 'assets/models/GatoRosa.glb', hex: '#FF80AB' },
      'azul': { file: 'assets/models/GatoAzul.glb', hex: '#90CAF9' },
      'verde': { file: 'assets/models/GatoVerde.glb', hex: '#A5D6A7' },
      'naranja': { file: 'assets/models/GatoNaraja.glb', hex: '#FFCC80' },
      'morado': { file: 'assets/models/GatoMorado.glb', hex: '#CE93D8' },
      'amarillo': { file: 'assets/models/GatoAmarrillo.glb', hex: '#FFF59D' },
      'cafe': { file: 'assets/models/GatoRaro.glb', hex: '#BCAAA4' }
    },
    'osito': {
      'gris': { file: 'assets/models/OSITO.glb', hex: '#808080' },
      'rosa': { file: 'assets/models/OSITORosa.glb', hex: '#FF80AB' },
      'azul': { file: 'assets/models/OSITOAzul.glb', hex: '#90CAF9' },
      'verde': { file: 'assets/models/OSITOVerde.glb', hex: '#A5D6A7' },
      'naranja': { file: 'assets/models/OSITONaranja.glb', hex: '#FFCC80' },
      'morado': { file: 'assets/models/OSITOMorado.glb', hex: '#CE93D8' },
      'amarillo': { file: 'assets/models/OSITOAmarrillo.glb', hex: '#FFF59D' },
      'cafe': { file: 'assets/models/OsitoCafe.glb', hex: '#BCAAA4' }
    }
  };

  outfitMapping: OutfitMapping = {
    'gato': {
      'sin-ropa': 'assets/models/gato.glb',
      'conjunto-invierno': 'assets/models/ConjuntoInviernoCompletoGato.glb',
      'gorro': 'assets/models/Modelado_Gorro_Gato.glb',
      'gorro-base': 'assets/models/ModeladoBASEGorro_Gato.glb',
      'overol': 'assets/models/ModeladoOVEROLGato.glb',
      'smoking': 'assets/models/ModeladoSmokin_gato.glb'
    },
    'osito': {
      'sin-ropa': 'assets/models/OSITO.glb',
      'conjunto-invierno': 'assets/models/ConjuntoInviernoCompletoOSO.glb',
      'gorro-base': 'assets/models/ModeladoBASEGorro_Oso.glb',
      'overol': 'assets/models/ModeladoOVEROL_OSO.glb',
      'smoking': 'assets/models/ModeladoSmokin_OSO.glb'
    }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadModelViewer();
    this.determineInitialAnimal();
    
    // Esperar un poco antes de cargar los viewers para asegurar que model-viewer esté listo
    setTimeout(() => {
      this.updateViewers();
    }, 500);
  }

  loadModelViewer(): void {
    if (!customElements.get('model-viewer')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js';
      document.head.appendChild(script);
    }
  }

  determineInitialAnimal(): void {
    this.route.queryParams.subscribe(params => {
      const modelParam = params['modelo'];
      
      console.log('Query params:', params);
      console.log('Modelo recibido:', modelParam);
      
      if (modelParam && modelParam.toLowerCase().includes('osito')) {
        this.currentAnimal = 'osito';
        this.pageTitle = 'Personaliza tu Mimosito Osito';
        this.showGorroOption = false;
      } else {
        this.currentAnimal = 'gato';
        this.pageTitle = 'Personaliza tu Mimosito Gato';
        this.showGorroOption = true;
      }
      
      console.log('Animal seleccionado:', this.currentAnimal);
      console.log('Título:', this.pageTitle);
    });
  }

  updateViewers(): void {
    this.colorViewerSrc = this.getColorModel(this.currentAnimal, this.currentColor);
    this.outfitViewerSrc = this.getOutfitModel(this.currentAnimal, this.currentOutfit);
    
    console.log('Color viewer source:', this.colorViewerSrc);
    console.log('Outfit viewer source:', this.outfitViewerSrc);
  }

  getColorModel(animal: string, color: string): string {
    return this.colorMapping[animal] && this.colorMapping[animal][color]
      ? this.colorMapping[animal][color].file
      : this.colorMapping['gato']['gris'].file;
  }

  getOutfitModel(animal: string, outfit: string): string {
    if (this.outfitMapping[animal] && this.outfitMapping[animal][outfit]) {
      return this.outfitMapping[animal][outfit];
    }
    
    return this.outfitMapping[animal] && this.outfitMapping[animal]['sin-ropa']
      ? this.outfitMapping[animal]['sin-ropa']
      : this.outfitMapping['gato']['sin-ropa'];
  }

  isColorSelected(colorName: string): boolean {
    return this.currentColor === colorName;
  }

  isOutfitSelected(outfitName: string): boolean {
    return this.currentOutfit === outfitName;
  }

  changeColor(colorName: string): void {
    if (colorName === this.currentColor) return;

    if (!this.colorMapping[this.currentAnimal] || !this.colorMapping[this.currentAnimal][colorName]) {
      console.error('Color no encontrado para', this.currentAnimal, ':', colorName);
      this.showNotification('Color no disponible', 'error');
      return;
    }

    this.loadingColor = true;
    this.statusMessage = 'Cambiando color...';
    this.currentColor = colorName;
    this.colorViewerSrc = this.getColorModel(this.currentAnimal, colorName);
  }

  changeOutfit(outfitName: string): void {
    if (outfitName === this.currentOutfit) return;

    if (!this.outfitMapping[this.currentAnimal] || !this.outfitMapping[this.currentAnimal][outfitName]) {
      this.statusMessage = `La opción "${outfitName.replace('-', ' ')}" no está disponible para ${this.currentAnimal}`;
      this.showNotification(`Opción no disponible para ${this.currentAnimal}`, 'warning');
      return;
    }

    this.loadingOutfit = true;
    this.statusMessage = 'Cambiando ropa...';
    this.currentOutfit = outfitName;
    this.outfitViewerSrc = this.getOutfitModel(this.currentAnimal, outfitName);
  }

  onSizeChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.currentSize = parseFloat(target.value);
  }

  onColorViewerLoad(): void {
    this.loadingColor = false;
    this.statusMessage = `Vista de colores cargada - ${this.currentAnimal}`;
    console.log('Modelo de color cargado');
  }

  onOutfitViewerLoad(): void {
    this.loadingOutfit = false;
    this.statusMessage = `Vista de ropa cargada - ${this.currentAnimal}`;
    console.log('Modelo de outfit cargado');
  }

  onColorViewerError(): void {
    this.loadingColor = false;
    console.error('Error al cargar modelo de color');
    this.showNotification('Error al cargar el modelo de color', 'error');
  }

  onOutfitViewerError(): void {
    this.loadingOutfit = false;
    console.error('Error al cargar modelo de outfit');
    this.showNotification('Error al cargar el modelo de ropa', 'error');
  }

  addToCart(): void {
    const basePrice = 299;
    const finalPrice = Math.round(basePrice * this.currentSize);

    const cartItem: CartItem = {
      model: this.getOutfitModel(this.currentAnimal, this.currentOutfit),
      name: `Mimosito ${this.currentAnimal.charAt(0).toUpperCase() + this.currentAnimal.slice(1)}`,
      color: this.currentColor,
      outfit: this.currentOutfit,
      size: this.currentSize,
      price: finalPrice,
      animal: this.currentAnimal
    };

    const carrito = this.getCarrito();
    carrito.push(cartItem);
    localStorage.setItem('mimositosCart', JSON.stringify(carrito));

    this.statusMessage = `¡${cartItem.name} agregado al carrito por ${finalPrice} MXN!`;
    this.showNotification(`¡${cartItem.name} agregado al carrito!`, 'success');

    setTimeout(() => {
      if (confirm('¿Quieres ir al catálogo para seguir comprando?')) {
        window.location.href = '/catalog3d';
      }
    }, 1500);
  }

  private getCarrito(): CartItem[] {
    const carritoStr = localStorage.getItem('mimositosCart');
    return carritoStr ? JSON.parse(carritoStr) : [];
  }

  private showNotification(message: string, type: 'success' | 'warning' | 'error' | 'info'): void {
    const notification = document.createElement('div');

    const colors = {
      success: { bg: '#d4edda', text: '#155724', border: '#28a745', icon: 'bi-check-circle-fill' },
      warning: { bg: '#fff3cd', text: '#856404', border: '#ffc107', icon: 'bi-exclamation-triangle-fill' },
      error: { bg: '#f8d7da', text: '#721c24', border: '#dc3545', icon: 'bi-x-circle-fill' },
      info: { bg: '#d1ecf1', text: '#0c5460', border: '#17a2b8', icon: 'bi-info-circle-fill' }
    };

    const color = colors[type];

    notification.style.cssText = `
      position: fixed;
      top: 120px;
      right: 20px;
      background: ${color.bg};
      color: ${color.text};
      padding: 15px 20px;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      z-index: 1000;
      font-weight: 500;
      border-left: 4px solid ${color.border};
      display: flex;
      align-items: center;
      gap: 10px;
      max-width: 300px;
      animation: slideIn 0.3s ease-out;
    `;

    notification.innerHTML = `<i class="bi ${color.icon}"></i>${message}`;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }
}

