import {
  Component, OnInit, Inject, AfterViewInit, OnDestroy, ChangeDetectorRef, Renderer2
} from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';
import { ToastrService } from 'ngx-toastr';
import { TemporizadorService } from '../../services/temporizador.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-partida-ruleta',
  templateUrl: './partida-ruleta.component.html',
  styleUrls: ['./partida-ruleta.component.css']
})
export class PartidaRuletaComponent implements OnInit, OnDestroy {
  tiempoRestante = 0;
  tiempoSub!: Subscription;
  intervalId: any;
  categorias: any[] = [];
  angle: number = 0;

  constructor(
    private categoriaService: CategoriaService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    private cd: ChangeDetectorRef,
    private router: Router,
    private toastr: ToastrService,
    private temporizadorService: TemporizadorService
  ) { }

  ngOnInit(): void {
    this.temporizadorService.iniciarTemporizador();
    this.tiempoSub = this.temporizadorService.tiempoRestante$.subscribe(tiempo => {
      this.tiempoRestante = tiempo;
      if (tiempo <= 0) {
        this.finalizarPartida();
      }
    });
  }

  ngAfterViewInit(): void {
    if (!this.esNavegador()) return;

    this.categoriaService.getCategorias().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
        this.cd.detectChanges();
        this.dibujarRuleta();
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
      }
    });
  }

  
  ngOnDestroy(): void {
    if (this.tiempoSub) {
      this.tiempoSub.unsubscribe();
    }
  }



  esNavegador(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  iniciarTemporizador() {
    this.intervalId = setInterval(() => {
      this.tiempoRestante--;
      if (this.tiempoRestante <= 0) {
        clearInterval(this.intervalId);
        this.finalizarPartida();
      }
    }, 1000);
  }

  finalizarPartida(): void {
    if (!this.esNavegador()) return;

    this.toastr.info('⏰ ¡Se acabó el tiempo!');

    const idUsuario = localStorage.getItem('idUsuario');
    if (idUsuario) {
      const preguntasRespondidasStr = localStorage.getItem('preguntasRespondidas');
      const preguntasRespondidas = preguntasRespondidasStr ? JSON.parse(preguntasRespondidasStr) : [];

      localStorage.setItem('resumenPartida', JSON.stringify(preguntasRespondidas));
      this.router.navigate(['/partidaResumen']);
    } else {
      this.toastr.warning('No se encontró el id del usuario. Redirección fallida.');
    }
  }

  girar(): void {
    if (!this.esNavegador()) return;

    const idPartida = localStorage.getItem('idPartida');
    console.log('🧩 idPartida desde localStorage:', idPartida); // 👈

    if (!idPartida) {
      console.error('❌ No hay idPartida en localStorage');
      return;
    }

    this.categoriaService.getCategoriaRuleta(idPartida).subscribe({
      next: (res) => {
        const categoriaSeleccionada = res.categoriaSeleccionada;
        const indice = this.categorias.findIndex(c => c._id === categoriaSeleccionada._id);
        if (indice === -1) return;

        const num = this.categorias.length;
        const anglePerCategory = 360 / num;
        const vueltas = 5;
        this.angle = 360 * vueltas + indice * anglePerCategory;

        const ruleta = document.getElementById('ruleta-wrapper');
        if (ruleta) {
          ruleta.style.transition = 'transform 4s ease-out';
          ruleta.style.transform = `rotate(${this.angle}deg)`;

          setTimeout(() => {
            this.toastr.success(`🎉 Categoría: ${categoriaSeleccionada.nombre}`);

            // 🔽 Aquí llamamos al backend para obtener una pregunta aleatoria de esa categoría
            const idCategoria = String(categoriaSeleccionada._id);
            this.categoriaService.getPreguntaAleatoria(idCategoria).subscribe({
              next: res => {
                console.log('✅ Pregunta aleatoria:', res);
                if (res.preguntaSeleccionada) {
                  localStorage.setItem('pregunta', JSON.stringify(res.preguntaSeleccionada));
                  console.log('🔁 Redirigiendo...')
                  this.router.navigate(['/partidaPregunta']);
                } else {
                  console.error('❌ No se encontró preguntaSeleccionada en la respuesta.');
                }
              },
              error: err => {
                console.error('❌ Error al obtener pregunta aleatoria:', err);
              }
            });
          }, 4000);
        }
      },
      error: (err) => console.error('Error al girar la ruleta:', err)
    });
  }

  dibujarRuleta(): void {
    if (!this.esNavegador()) return;

    const canvas = document.getElementById('ruleta') as HTMLCanvasElement;
    if (!canvas || this.categorias.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) * 0.4;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const num = this.categorias.length;
    const angleStep = (2 * Math.PI) / num;

    this.categorias.forEach((cat, i) => {
      ctx.fillStyle = this.getColor(i);
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, i * angleStep, (i + 1) * angleStep);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const angle = i * angleStep + angleStep / 2;
      const x = centerX + Math.cos(angle) * radius * 0.7;
      const y = centerY + Math.sin(angle) * radius * 0.7;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillText(cat.nombre, 0, 0);
      ctx.restore();
    });
  }

  getColor(index: number): string {
    const colores = ['#4e79a7', '#f28e2c', '#e15759', '#76b7b2', '#59a14f', '#edc949', '#af7aa1'];
    return colores[index % colores.length];
  }
}