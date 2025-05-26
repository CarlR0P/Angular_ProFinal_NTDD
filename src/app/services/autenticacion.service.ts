import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  // Antes:
  // apiUri = 'http://localhost:3000/api';

  // Ahora:
  apiUri = '/api';   // Sólo la ruta base
  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  registrarUsuario(data: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUri}/signup`,
      data,
      { headers: this.httpOptions }
    );
  }

  iniciarSesion(data: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUri}/login`,
      data,
      { headers: this.httpOptions }
    );
  }

  obtenerUsuarioActual(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUri}/usuario-actual`,
      { withCredentials: true }  // 🔥 Se utiliza la cookie de sesión
    );
  }
}

