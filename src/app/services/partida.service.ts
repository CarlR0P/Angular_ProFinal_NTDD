import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartidaService {

  private apiUrl = 'http://localhost:3000'; // Cambia esto si tu backend está en otro lugar

  constructor(private http: HttpClient) {}

  crearPartida(idUsuario: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/partidas`, { idUsuario });
  }

  obtenerCategoriaAleatoria(idPartida: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/partidas/${idPartida}/ruleta`);
  }

  obtenerPregunta(idPartida: string, idCategoria: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/partidas/${idPartida}/categoria/${idCategoria}/pregunta`);
  }

  responderPregunta(idPartida: string, idPregunta: string, respuestaSeleccionada: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/partidas/${idPartida}/responder`, {
      idPregunta,
      respuestaSeleccionada
    });
  }

  obtenerResumen(idPartida: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/partidas/${idPartida}/resumen`);
  }
}
