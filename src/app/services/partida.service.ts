import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartidaService {

  private apiUrl = 'http://localhost:3000'; // Cambia esto si tu backend está en otro lugar

  constructor(private http: HttpClient) {}

  crearPartida(idUsuario: string) {
     console.log('📡 Enviando POST a /api/partidas con:', idUsuario);
  return this.http.post<any>('http://localhost:3000/api/partidas', { idUsuario });
}

  obtenerCategoriaAleatoria(idPartida: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/partidas/${idPartida}/ruleta`);
  }

  obtenerPregunta(idPartida: string, idCategoria: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/partidas/${idPartida}/categoria/${idCategoria}/pregunta`);
  }

  obtenerResumen(idPartida: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/partidas/${idPartida}/resumen`);
  }
  responderPregunta(data: any) {
  return this.http.post('/api/partida/responder', data);
}
}
