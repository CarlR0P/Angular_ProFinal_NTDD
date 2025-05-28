import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈 Importar esto
import { AutenticacionService } from '../../services/autenticacion.service';

@Component({
  selector: 'app-mi-perfil',
  standalone: true, // 👈 Si estás usando componentes standalone
  imports: [CommonModule], // 👈 Agregar CommonModule aquí
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {
  usuario: any = null;

  constructor(private authService: AutenticacionService) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) return;

      const payload = JSON.parse(atob(token.split('.')[1]));
      const id = payload.id;

      this.authService.obtenerUsuarioPorId(id).subscribe({
        next: (usuario) => {
          this.usuario = usuario;
        },
        error: (err) => {
          console.error('Error al obtener perfil', err);
        }
      });
    }
  }
}
