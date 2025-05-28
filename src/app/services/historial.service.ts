import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
  
@Injectable({ providedIn: 'root' })
export class HistorialService {
  private baseUrl = 'http://localhost:3000/api'; // Asegúrate de ajustar si usas proxy

  constructor(private http: HttpClient) {}

 obtenerPartidasPorUsuario(idUsuario: string): Observable<any[]> {
    return this.http.get<any[]>(`/api/usuarios/${idUsuario}/partidas`);
  }
}