import { Component } from '@angular/core';

interface RespuestaUsuario {
  preguntaId: string;
  preguntaTexto: string;
  respuestaUsuario: string;
  respuestaCorrecta: string;
  correcta: boolean;
}

@Component({
  selector: 'app-partida-pregunta',
  templateUrl: './partida-pregunta.component.html',
  styleUrls: ['./partida-pregunta.component.css']
})
export class PartidaPreguntaComponent {
  respuestasUsuario: RespuestaUsuario[] = [];


  preguntaActual = {
    _id: '123',
    texto: '¿Cuál es la capital de Francia?',
    respuestaCorrecta: 'París',
    opciones: ['Madrid', 'París', 'Roma']
  };

  responder(respuestaSeleccionada: string) {
    const correcta = respuestaSeleccionada === this.preguntaActual.respuestaCorrecta;

    this.respuestasUsuario.push({
      preguntaId: this.preguntaActual._id,
      preguntaTexto: this.preguntaActual.texto,
      respuestaUsuario: respuestaSeleccionada,
      respuestaCorrecta: this.preguntaActual.respuestaCorrecta,
      correcta
    });

    if (this.respuestasUsuario.length >= 5) {
      localStorage.setItem('respuestasUsuario', JSON.stringify(this.respuestasUsuario));
      
    }
  }
}
