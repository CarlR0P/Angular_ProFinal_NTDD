import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-partida-resumen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partida-resumen.component.html',
  styleUrls: ['./partida-resumen.component.css']
})
export class PartidaResumenComponent implements OnInit {
  resumen: any = null;
  idPartida: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idPartida = localStorage.getItem('idPartida') || '';

    if (!this.idPartida) {
      this.router.navigate(['/']);
      return;
    }

    // Petición al backend
    this.http.get(`http://localhost:3000/api/partidas/${this.idPartida}/resumen`)
      .subscribe({
        next: (data: any) => {
          this.resumen = data;
        },
        error: (error) => {
          console.error('Error al obtener resumen de la partida:', error);
        }
      });
  }

  volverAlInicio() {
    this.router.navigate(['/']);
  }
}