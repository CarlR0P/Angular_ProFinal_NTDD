import { Component, OnInit } from '@angular/core';
import { PreguntaService } from '../../services/pregunta.service';
import { CategoriaService } from '../../services/categoria.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PreguntaComponent implements OnInit {
  pregunta: any= [];
  preguntas: any = [];
  categorias: any[] = [];
  categoriaSeleccionada: string | null = null;
  hayPreguntas: boolean = false;

  // Formulario
  form: {
    _id?: string;
    enunciado: string;
    categoria: string;
    opciones: { opcion: string; correcta: boolean }[];
  } = {
    enunciado: '',
    categoria: '',
    opciones: [
      { opcion: '', correcta: false },
      { opcion: '', correcta: false },
      { opcion: '', correcta: false },
      { opcion: '', correcta: false }
    ]
  };
  indiceCorrecto: number | null = null;
  preguntaEditando: any = null;

  constructor(
    private router: Router,
    private preguntaService: PreguntaService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarPreguntas();
  }

  cargarCategorias(): void {
    this.categoriaService.getCategorias()
      .subscribe((data: any[]) => this.categorias = data);
  }


  cargarPreguntas() {
    const obs = this.categoriaSeleccionada
      ? this.preguntaService.getPreguntasPorCategoria(this.categoriaSeleccionada)
      : this.preguntaService.getPreguntas();

    obs.subscribe((data: {}) => {
    this.preguntas = data;
    this.hayPreguntas = this.preguntas.length > 0;
  });
}

  eliminarPregunta(id: string): void {
    if (confirm('¿Estás seguro de eliminar esta pregunta?')) {
      this.preguntaService.eliminarPregunta(id)
        .subscribe(() => this.cargarPreguntas());
    }
  }

  // ---------- CRUD Formulario ----------

  prepararEdicionPregunta(p: any) {
    this.preguntaEditando = p;
    this.form = {
      _id: p._id,
      enunciado: p.enunciado,
      categoria: p.categoria,
      opciones: p.opciones.map((o: any) => ({
        opcion: o.opcion,
        correcta: o.correcta
      }))
    };
    this.indiceCorrecto = p.opciones.findIndex((o: any) => o.correcta);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  guardarPregunta() {
    this.form.opciones.forEach((o, i) => {
      o.correcta = i === this.indiceCorrecto;
    });

    const peticion = this.preguntaEditando
      ? this.preguntaService.actualizarPregunta(this.form._id!, this.form)
      : this.preguntaService.crearPregunta(this.form);

    peticion.subscribe(() => this.finalizarSave());
  }

  cancelarEdicion() {
    this.preguntaEditando = null;
    this.indiceCorrecto = null;
    this.form = {
      enunciado: '',
      categoria: '',
      opciones: [
        { opcion: '', correcta: false },
        { opcion: '', correcta: false },
        { opcion: '', correcta: false },
        { opcion: '', correcta: false }
      ]
    };
  }

  private finalizarSave() {
    this.cancelarEdicion();
    this.cargarPreguntas();
  }

  // NUEVO MÉTODO para evitar errores de plantilla
  obtenerNombreCategoria(id: string): string {
    const categoria = this.categorias.find(cat => cat._id === id);
    return categoria ? categoria.nombre : '—';
  }
}
