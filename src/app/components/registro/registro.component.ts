import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  usuario = {
    nombreUsuario: '',
    nombre: '',
    apellido: '',
    correo: '',
    clave: '',
    rol: 'jugador' // Puedes cambiar esto si vas a permitir que el usuario seleccione el rol
  };

  constructor(
    private authService: AutenticacionService,
    private router: Router
  ) {}

  registrar() {
    this.authService.registrarUsuario(this.usuario).subscribe({
      next: (res) => {
        console.log('Registro exitoso', res);
        // Redirigir al login u otra página
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error durante el registro', err);
        alert('Error al registrar usuario. Intenta nuevamente.');
      }
    });
  }

  regresar() {
    this.router.navigate(['/login']);
  }
}

