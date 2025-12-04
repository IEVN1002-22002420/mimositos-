import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL = 'http://localhost:5000'; // URL de tu backend Flask

  constructor(private http: HttpClient) {}

  // =============================
  // USUARIOS
  // =============================

  registrar(datos: any): Observable<any> {
    return this.http.post(`${this.API_URL}/registrar`, datos);
  }

  login(datos: any): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, datos);
  }

  // =============================
  // ADMIN
  // =============================

  loginAdmin(datos: any): Observable<any> {
    return this.http.post(`${this.API_URL}/admin/login`, datos);
  }

  agregarInventario(item: any): Observable<any> {
    return this.http.post(`${this.API_URL}/inventario/agregar`, item);
  }

  obtenerInventario(): Observable<any> {
    return this.http.get(`${this.API_URL}/inventario`);
  }

  // =============================
  // PRODUCTOS / CATÁLOGO 3D
  // =============================

  obtenerProductos(): Observable<any> {
    return this.http.get(`${this.API_URL}/productos`);
  }

  // =============================
  // CARRITO
  // =============================

  obtenerCarrito(usuario: string): Observable<any> {
    return this.http.get(`${this.API_URL}/carrito/${usuario}`);
  }

  agregarCarrito(producto: any): Observable<any> {
    return this.http.post(`${this.API_URL}/carrito/agregar`, producto);
  }

  eliminarDelCarrito(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/carrito/eliminar/${id}`);
  }

  vaciarCarrito(usuario: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/carrito/vaciar/${usuario}`);
  }

  procesarPago(usuario: string): Observable<any> {
    return this.http.post(`${this.API_URL}/carrito/pagar`, { usuario });
  }
}
