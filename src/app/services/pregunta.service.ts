import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Opcion {
  opcion: string;
  correcta: boolean;
}

export interface Pregunta {
  _id?: string;
  enunciado: string;
  opciones: Opcion[];
  categoria: string;
}

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
  private apiUrl = '/api/preguntas';

  constructor(private http: HttpClient) {}

  getPreguntas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getPregunta(id: string): Observable<Pregunta> {
    return this.http.get<Pregunta>(`${this.apiUrl}/${id}`);
  }

  getPreguntasPorCategoria(categoriaId: string): Observable<Pregunta[]> {
    return this.http.get<Pregunta[]>(`${this.apiUrl}/categoria-id/${categoriaId}`);
  }

  crearPregunta(pregunta: Pregunta): Observable<Pregunta> {
    return this.http.post<Pregunta>(this.apiUrl, pregunta);
  }

  actualizarPregunta(id: string, pregunta: Pregunta): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, pregunta);
  }

  eliminarPregunta(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}