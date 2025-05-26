import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartidaService {
  private baseUrl = 'http://localhost:3000'; // Cambia al dominio/puerto correcto

  constructor(private http: HttpClient) {}

  crearPartida(idUsuario: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/partidas`, { idUsuario });
  }

  girarRuleta(idPartida: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/partidas/${idPartida}/ruleta`);
  }

  obtenerPregunta(idPartida: string, idCategoria: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/partidas/${idPartida}/categoria/${idCategoria}/pregunta`);
  }

  responderPregunta(idPartida: string, idPregunta: string, respuestaSeleccionada: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/partidas/${idPartida}/responder`, {
      idPregunta,
      respuestaSeleccionada
    });
  }

  obtenerResumen(idPartida: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/partidas/${idPartida}/resumen`);
  }
}
