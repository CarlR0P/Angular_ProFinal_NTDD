import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { HistorialService } from '../../services/historial.service';

@Component({
  selector: 'app-historial-partidas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-partidas.component.html',
  styleUrls: ['./historial-partidas.component.css']
})
export class HistorialPartidasComponent implements OnInit {
  historialService = inject(HistorialService);
  partidas: any[] = [];

  ngOnInit(): void {
    const idUsuario = localStorage.getItem('idUsuario');
    if (idUsuario) {
      this.historialService.obtenerPartidasPorUsuario(idUsuario).subscribe({
        next: (res: any[]) => {
          this.partidas = res.map(partida => {
            const correctas = partida.preguntasRespondidas.filter(
              (p: any) => p.esCorrecta === true
            ).length;
            const incorrectas = partida.preguntasRespondidas.length - correctas;

            return {
              ...partida,
              correctas,
              incorrectas
            };
          });
        },
        error: err => console.error('Error al obtener historial:', err)
      });
    }
  }
}