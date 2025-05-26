import { Component, OnInit, Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partida-ruleta',
  templateUrl: './partida-ruleta.component.html',
  styleUrls: ['./partida-ruleta.component.css']
})
export class PartidaRuletaComponent implements AfterViewInit,OnInit {
   tiempoRestante: number = 60; // Tiempo total en segundos
  intervalId: any;
  categorias: any[] = [];
  angle: number = 0;
  private canvasInitialized = false;


  constructor(
    private categoriaService: CategoriaService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    private cd : ChangeDetectorRef,
    private router: Router
    
  ) {}
ngOnInit(): void {
  this.iniciarTemporizador();
}

iniciarTemporizador(): void {
  this.intervalId = setInterval(() => {
    this.tiempoRestante--;
    if (this.tiempoRestante <= 0) {
      clearInterval(this.intervalId);
      this.finalizarPartida();
    }
  }, 1000);
}

finalizarPartida(): void {
  alert('⏰ ¡Se acabó el tiempo!');
   const idUsuario = localStorage.getItem('idUsuario');
  if (idUsuario) {
     this.router.navigate(['/resultados']);
  } else {
    alert('No se encontró el id del usuario. Redirección fallida.');
    
  }
}

ngOnDestroy(): void {
  if (this.intervalId) {
    clearInterval(this.intervalId);
  }
}
  ngAfterViewInit(): void {
  this.categoriaService.getCategorias().subscribe(
    (categorias) => {
      console.log("Categorías cargadas:", categorias); // Verifica en la consola del navegador (F12)
      this.categorias = categorias;
      this.cd.detectChanges();
      this.dibujarRuleta();
    },
    (error) => {
      console.error("Error al cargar categorías:", error);
    }
  );
}

girar() {
  const idPartida = localStorage.getItem('idPartida');
  if (!idPartida) {
    console.error('No hay idPartida en localStorage');
    return;
  }

  console.log('Girando ruleta...'); // Debug
  this.categoriaService.getCategoriaRuleta(idPartida).subscribe(
    res => {
      console.log('Respuesta de la API:', res); // Debug
      const categoriaSeleccionada = res.categoriaSeleccionada;
      const indiceSeleccionado = this.categorias.findIndex(c => c._id === categoriaSeleccionada._id);
      
      if (indiceSeleccionado === -1) {
        console.error('Categoría no encontrada en la lista');
        return;
      }

      const numCategorias = this.categorias.length;
      const anglePerCategory = 360 / numCategorias;
      const randomSpins = 5;
      this.angle = 360 * randomSpins + indiceSeleccionado * anglePerCategory;

      const ruleta = document.getElementById('ruleta-wrapper');
      if (!ruleta) {
        console.error('Elemento ruleta-wrapper no encontrado');
        return;
      }

      ruleta.style.transition = 'transform 4s ease-out';
      ruleta.style.transform = `rotate(${this.angle}deg)`;

      setTimeout(() => {
        alert(`¡La categoría seleccionada es: ${categoriaSeleccionada.nombre}!`);
      }, 4000);
    },
    error => {
      console.error('Error al girar la ruleta:', error); // Debug
    }
  );
}

  dibujarRuleta() {
    
    console.log('Ejecutando dibujarRuleta. Categorías:', this.categorias);

  if (isPlatformBrowser(this.platformId)) {
    const canvas = document.getElementById('ruleta') as HTMLCanvasElement;

    if (!canvas) {
      console.error('Canvas no encontrado');
      return;
    }

    if (this.categorias.length === 0) {
      console.error("No hay categorías para dibujar");
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) * 0.4;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const numCategorias = this.categorias.length;
    const anglePerCategory = (2 * Math.PI) / numCategorias;

    this.categorias.forEach((cat, i) => {
      ctx.fillStyle = this.getColor(i); // usa colores bonitos
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, i * anglePerCategory, (i + 1) * anglePerCategory);
      ctx.closePath();
      ctx.fill();

      // Texto
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const textAngle = i * anglePerCategory + anglePerCategory / 2;
      const textX = centerX + Math.cos(textAngle) * (radius * 0.7);
      const textY = centerY + Math.sin(textAngle) * (radius * 0.7);

      ctx.save();
      ctx.translate(textX, textY);
      ctx.rotate(textAngle); // puedes quitar + Math.PI/2 si el texto queda feo
      ctx.fillText(cat.nombre, 0, 0);
      ctx.restore();
    });
  }
}

getColor(index: number): string {
  const colores = ['#4e79a7', '#f28e2c', '#e15759', '#76b7b2', '#59a14f', '#edc949', '#af7aa1'];
  return colores[index % colores.length];
}
}
