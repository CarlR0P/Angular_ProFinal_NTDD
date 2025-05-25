import { Component } from '@angular/core';
import { AutenticacionService } from '../../services/autenticacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  usuario = {
    username: '',
    nombres: '',
    apellidos: '',
    email: '',
    password: ''
  };

  constructor(
    private authService: AutenticacionService,
    private router: Router
  ) {}

  registrar() {
    this.authService.registrarUsuario(this.usuario).subscribe({
      next: (respuesta) => {
        console.log('Usuario registrado correctamente', respuesta);
        // Redirigir a login u otra página
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error en el registro', error);
        // Aquí puedes mostrar una alerta o mensaje en pantalla
      }
    });
  }

  regresar() {
    this.router.navigate(['/']);
  }
}
