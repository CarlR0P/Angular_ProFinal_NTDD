import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  apiUri = 'http://localhost:3000/api'; // Cambia si tu API usa otro puerto o ruta base
  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  // Registro (signup)
  registrarUsuario(data: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUri}/signup`,
      data,
      { headers: this.httpOptions }
    );
  }

  // Inicio de sesión (login)
  iniciarSesion(data: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUri}/login`,
      data,
      { headers: this.httpOptions }
    );
  }
}

