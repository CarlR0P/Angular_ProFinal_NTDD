// partida-ruleta.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartidaService } from '../../services/partida.service';

@Component({
  selector: 'app-partida-ruleta',
  templateUrl: './partida-ruleta.component.html'
})
export class PartidaRuletaComponent implements OnInit {
  categoria: any = null;
  girando: boolean = true;

  constructor(private partidaService: PartidaService, private router: Router) {}

  ngOnInit(): void {
    const idPartida = localStorage.getItem('idPartida');
    if (idPartida) {
      this.girarRuleta(idPartida);
    }
  }

  girarRuleta(idPartida: string) {
    this.girando = true;
    this.partidaService.obtenerCategoriaAleatoria(idPartida).subscribe(resp => {
      setTimeout(() => {
        this.categoria = resp.categoriaSeleccionada;
        this.router.navigate(['/partida/pregunta', this.categoria._id]);
      }, 2000); // simula el tiempo de giro
    });
  }
}