import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service'; // Asegúrate que existe
import { Router } from '@angular/router';

@Component({
  selector: 'app-partida-ruleta',
  templateUrl: './partida-ruleta.component.html',
  styleUrls: ['./partida-ruleta.component.css']
})
export class PartidaRuletaComponent implements OnInit {
  categorias: any[] = [];
  rotacion: number = 0;

  constructor(private categoriaService: CategoriaService, private router: Router) {}

  ngOnInit(): void {
    this.categoriaService.obtenerCategorias().subscribe((cats) => {
      this.categorias = cats;
    });
  }

  getEstiloSegmento(i: number): any {
    const angulo = 360 / this.categorias.length;
    return {
      transform: `rotate(${i * angulo}deg)`,
      backgroundColor: `hsl(${i * angulo}, 70%, 50%)`
    };
  }

  girarRuleta(): void {
    const vueltas = Math.floor(Math.random() * 3) + 5; // entre 5 y 7 vueltas
    const gradoFinal = Math.floor(Math.random() * 360);
    this.rotacion += vueltas * 360 + gradoFinal;
  }
}