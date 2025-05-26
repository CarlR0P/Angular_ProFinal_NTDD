import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartidaService } from '../../services/partida.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-partida-pregunta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partida-pregunta.component.html'
})
export class PartidaPreguntaComponent implements OnInit {
  pregunta: any;
  seleccionada: string | null = null;
  respuestaCorrecta: string | null = null;
  feedbackVisible = false;
  contador: number = 15;
  intervalo: any;

  constructor(
    private route: ActivatedRoute,
    private partidaService: PartidaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idPartida = localStorage.getItem('idPartida');
    const idCategoria = this.route.snapshot.paramMap.get('id');
    if (idPartida && idCategoria) {
      this.partidaService.obtenerPregunta(idPartida, idCategoria).subscribe(res => {
        this.pregunta = res.preguntaSeleccionada;
        this.iniciarTemporizador();
      });
    }
  }

  iniciarTemporizador() {
    this.contador = 15;
    this.intervalo = setInterval(() => {
      this.contador--;
      if (this.contador === 0) {
        clearInterval(this.intervalo);
        this.responder(null);
      }
    }, 1000);
  }

  responder(opcion: string | null) {
  if (opcion === null) return; // Evita el error

  clearInterval(this.intervalo);
  this.seleccionada = opcion;

  const idPartida = localStorage.getItem('idPartida');

  this.partidaService.responderPregunta(idPartida!, this.pregunta._id, opcion).subscribe(resp => {
    this.feedbackVisible = true;
    this.respuestaCorrecta = this.pregunta.opciones.find((op: any) => op.correcta).opcion;

    setTimeout(() => {
      this.feedbackVisible = false;
      this.router.navigate(['/partida/ruleta']);
    }, 2000);
  });
}
}
