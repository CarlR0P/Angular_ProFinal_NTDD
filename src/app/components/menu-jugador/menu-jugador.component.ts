import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';
 
@Component({
  selector: 'app-menu-jugador',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-jugador.component.html',
  styleUrls: ['./menu-jugador.component.css']
})
export class MenuJugadorComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AutenticacionService);
 
  usuarioActual: any = null;
  errorMensaje: string = '';
 
  ngOnInit(): void {
    // Llamada directa al backend para obtener el usuario actual sin usar token ni localStorage
    this.authService.obtenerUsuarioActual().subscribe({
      next: (res) => {
        this.usuarioActual = res;
        this.errorMensaje = '';
      },
      error: (err) => {
        this.errorMensaje = err.error?.error || 'No se pudo obtener la información del usuario';
        this.usuarioActual = null;
      }
    });
  }
 
  get mostrarMenu(): boolean {
    if (!this.usuarioActual) return false;
 
    const ruta = this.router.url;
 
    return this.usuarioActual.rol === 'jugador' &&
      (ruta.includes('/partida-inicio') || ruta.includes('/historial-partidas'));
  }
}