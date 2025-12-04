import { Component } from '@angular/core';

interface Estambre {
  color: string;
  cantidad: number;
}

@Component({
  selector: 'app-inventoryadmin',
  standalone: false,
  templateUrl: './inventoryadmin.component.html',
  styleUrl: './inventoryadmin.component.css'
})
export class InventoryadminComponent {
nuevoColor: string = "";
  nuevaCantidad: number = 0;

  inventario: Estambre[] = [];

  constructor() {
    this.cargarInventario();
  }

  cargarInventario() {
    const data = localStorage.getItem("invEstambre");

    this.inventario = data ? JSON.parse(data) : [];
  }

  guardarInventario() {
    localStorage.setItem("invEstambre", JSON.stringify(this.inventario));
  }

  agregarEstambre() {
    if (!this.nuevoColor || this.nuevaCantidad <= 0) return;

    const item: Estambre = {
      color: this.nuevoColor,
      cantidad: this.nuevaCantidad
    };

    this.inventario.push(item);
    this.guardarInventario();

    this.nuevoColor = "";
    this.nuevaCantidad = 0;
  }
}

