import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-admin',
  imports: [CommonModule],
  templateUrl: './menu-admin.component.html',
  styleUrl: './menu-admin.component.css'
})
export class MenuAdminComponent {
constructor(private router: Router){}

  get mostrarMenu(): boolean {
    const ruta = this.router.url;
    return ruta.includes('/partida') || ruta.includes('/perfil-jugador') 
    || ruta.includes('/historial-partidas') || ruta.includes('/inicio-jugador') || 
    ruta.includes('/ruleta');
  }
}
