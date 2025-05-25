import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import type { Categoria } from '../../services/categoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html'
})
export class CategoriaComponent implements OnInit {

  categorias: Categoria[] = [];
  nuevaCategoria: string = '';
  categoriaEditando: Categoria | null = null;
  nombreEditado: string = '';

  constructor(
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoriaService.getCategorias().subscribe((data: Categoria[]) => {
      this.categorias = data;
    });
  }

  crearCategoria(): void {
    if (!this.nuevaCategoria.trim()) return;

    const categoria: Categoria = { nombre: this.nuevaCategoria };
    this.categoriaService.crearCategoria(categoria).subscribe(() => {
      this.nuevaCategoria = '';
      this.cargarCategorias();
    });
  }

  prepararEdicion(categoria: Categoria): void {
    this.categoriaEditando = { ...categoria };
    this.nombreEditado = categoria.nombre;
  }

  cancelarEdicion(): void {
    this.categoriaEditando = null;
    this.nombreEditado = '';
  }

  actualizarCategoria(): void {
    if (!this.categoriaEditando || !this.nombreEditado.trim()) return;

    const categoriaActualizada: Categoria = {
      _id: this.categoriaEditando._id,
      nombre: this.nombreEditado
    };

    this.categoriaService.actualizarCategoria(categoriaActualizada._id!, categoriaActualizada)
      .subscribe(() => {
        this.categoriaEditando = null;
        this.nombreEditado = '';
        this.cargarCategorias();
      });
  }

  eliminarCategoria(id: string): void {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      this.categoriaService.eliminarCategoria(id).subscribe(() => {
        this.cargarCategorias();
      });
    }
  }
}
