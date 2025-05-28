import { Component, OnInit, inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { PartidaService } from '../../services/partida.service';

@Component({
  selector: 'app-partida-pregunta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partida-pregunta.component.html',
  styleUrls: ['./partida-pregunta.component.css']
})
export class PartidaPreguntaComponent implements OnInit {
  pregunta: any;
  yaRespondio: boolean = false;
  opcionSeleccionada: any = null;
  private platformId = inject(PLATFORM_ID);

  constructor(
    private router: Router,
    private partidaService: PartidaService,
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const preguntaStr = localStorage.getItem('pregunta');
      if (preguntaStr) {
        this.pregunta = JSON.parse(preguntaStr);
      } else {
        console.error('No hay pregunta en localStorage.');
      }
    }
  }

  seleccionarOpcion(opcion: any) {
  this.opcionSeleccionada = opcion;
  this.yaRespondio = false; // Asegúrate de resetear si cambia de opción
}

responder(): void {
    if (!this.opcionSeleccionada || !this.pregunta) return;

    const esCorrecta = this.opcionSeleccionada.correcta;
    const respuesta = {
      idPartida: localStorage.getItem('idPartida'),
      idPregunta: this.pregunta._id,
      respuestaUsuario: this.opcionSeleccionada.opcion,
      esCorrecta: esCorrecta
    };

    this.partidaService.responderPregunta(respuesta).subscribe({
      next: () => {
        // También puedes actualizar el localStorage de preguntasRespondidas aquí si quieres
        this.router.navigate(['/partidaRuleta']);
      },
      error: err => {
        console.error('❌ Error al responder pregunta:', err);
      }
    });
}
}
