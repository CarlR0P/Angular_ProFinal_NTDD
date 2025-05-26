import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';
 
@Component({
  selector: 'app-menu-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit {
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
 
    return this.usuarioActual.rol === 'administrador' &&
      (ruta.includes('/pregunta') || ruta.includes('/categoria'));
  }
}