import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import type { Categoria } from '../../services/categoria.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  imports: [FormsModule, CommonModule]
})
export class CategoriaComponent implements OnInit {

  categorias: Categoria[] = [];
  nuevaCategoria: string = '';
  categoriaEditando: Categoria | null = null;
  nombreEditado: string = '';

  constructor(
    private categoriaService: CategoriaService,
    private router: Router, private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoriaService.getCategorias().subscribe((data: Categoria[]) => {
      this.categorias = data;
    });
  }

  newMessage(messageText: string) {
    this.toastr.success('Clic aquí para actualizar la lista', messageText)
      .onTap
      .pipe(take(1))
      .subscribe(() => window.location.reload());
  }

  crearCategoria(): void {
    const nombre = this.nuevaCategoria.trim();
    if (!nombre) return;

    // Validar duplicados al crear
    if (this.categorias.some(cat => cat.nombre.toLowerCase() === nombre.toLowerCase())) {
      alert('Ya existe una categoría con ese nombre.');
      return;
    }

    const categoria: Categoria = { nombre };
    this.categoriaService.crearCategoria(categoria).subscribe(() => {
      this.nuevaCategoria = '';
      //this.cargarCategorias();
      //Redirigiendo a la ruta actual /inicio y recargando la ventana
        this.router.navigate(['/categoria'])
          .then(() => {
            this.newMessage('Registro exitoso');
          })
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
    if (!this.categoriaEditando) return;

    const nombre = this.nombreEditado.trim();
    if (!nombre) return;

    // Validar duplicados al actualizar (ignorando la categoría que se está editando)
    if (this.categorias.some(cat =>
      cat.nombre.toLowerCase() === nombre.toLowerCase() && cat._id !== this.categoriaEditando!._id
    )) {
      alert('Ya existe una categoría con ese nombre.');
      return;
    }

    const categoriaActualizada: Categoria = {
      _id: this.categoriaEditando._id,
      nombre
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
