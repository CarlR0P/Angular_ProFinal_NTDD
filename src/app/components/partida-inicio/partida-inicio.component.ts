import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PartidaService } from '../../services/partida.service';


@Component({
  selector: 'app-partida-inicio',
  templateUrl: './partida-inicio.component.html'
})
export class PartidaInicioComponent {
  constructor(private partidaService: PartidaService, private router: Router) {}

  iniciarPartida() {
    const idUsuario = localStorage.getItem('idUsuario'); // o como manejes el login

    if (idUsuario) {
      this.partidaService.crearPartida(idUsuario).subscribe(partida => {
        localStorage.setItem('idPartida', partida._id);
        this.router.navigate(['/partida/ruleta']);
      });
    }
  }
  
}