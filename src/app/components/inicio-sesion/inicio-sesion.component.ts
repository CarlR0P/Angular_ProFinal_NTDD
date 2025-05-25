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
  correo: string = '';
  clave: string = '';
  rememberMe: boolean = false;
  mensaje: string = '';
  esError: boolean = false;

  constructor(
    private authService: AutenticacionService,
    private router: Router
  ) {}

  iniciarSesion() {
    const payload = {
      correo: this.correo,
      clave: this.clave
    };

    this.authService.iniciarSesion(payload).subscribe({
      next: res => {
        if (res.auth) {
          this.esError = false;
          this.mensaje = res.message;
          // Si quieres guardar token o manejar sesión:
          // localStorage.setItem('token', res.token);
          // Redirigir tras un pequeño retardo:
          setTimeout(() => this.router.navigate(['/']), 1500);
        }
      },
      error: err => {
        this.esError = true;
        this.mensaje = err.error?.error || 'Error desconocido';
      }
    });
  }
}
