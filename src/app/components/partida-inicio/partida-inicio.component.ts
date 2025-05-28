import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PartidaService } from '../../services/partida.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-partida-inicio',
  templateUrl: './partida-inicio.component.html'
})
export class PartidaInicioComponent {

  constructor(
    private partidaService: PartidaService,
    private router: Router,
    private toastr: ToastrService
  ) {}

 iniciarPartida() {
  console.log(' Iniciando partida...');

  const idUsuario = localStorage.getItem('idUsuario');
  console.log(' idUsuario obtenido:', idUsuario);

  if (idUsuario) {
    this.partidaService.crearPartida(idUsuario).subscribe({
      next: partida => {
        console.log('Partida creada con éxito:', partida);
        localStorage.setItem('idPartida', partida._id);
        console.log('Redirigiendo a ruleta...');
        this.router.navigate(['/partidaRuleta']);
      },
      error: err => {
        console.error(' Error al crear partida:', err);
      }
    });
  } else {
    console.warn(' No se encontró idUsuario en localStorage');
  }
}

}