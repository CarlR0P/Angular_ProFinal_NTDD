import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {
  correo = '';
  clave = '';
  mensaje = '';
  esError = false;

  constructor(
    private authService: AutenticacionService,
    private router: Router
  ) {}

  iniciarSesion() {
    const payload = { correo: this.correo, clave: this.clave };

    this.authService.iniciarSesion(payload).subscribe({
      next: res => {
        const token = res.token;
        localStorage.setItem('token', token);
       
        // Decodificar rol del JWT
        const jwtPayload = JSON.parse(atob(token.split('.')[1]));
        const rol = (jwtPayload.rol || '').toLowerCase();

        localStorage.setItem('idUsuario', jwtPayload.id);

        this.esError = false;
        this.mensaje = res.message;

        // Redirigir según rol
        if (rol === 'administrador') {
          this.router.navigate(['/menu-admin']);
        } else {
          this.router.navigate(['/menu-jugador']);
        }
      },
      error: err => {
        this.esError = true;
        this.mensaje = err.error?.error || 'Error desconocido';
      }
    });
  }
}
