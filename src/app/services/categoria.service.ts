import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Categoria {
  _id?: string;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = '/api/categoria';

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<Categoria[]> {
  return this.http.get<Categoria[]>(this.apiUrl);
}

  getCategoria(id: string): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/${id}`);
  }

  crearCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, categoria);
  }

  actualizarCategoria(id: string, categoria: Categoria): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, categoria);
  }

  eliminarCategoria(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

getCategoriaRuleta(idPartida: string) {
  return this.http.get<any>(`/api/partidas/${idPartida}/categoria`);
}
getPreguntaAleatoria(idCategoria: string) {
  return this.http.get<any>(`/api/preguntas/aleatoria/${idCategoria}`);
}
}