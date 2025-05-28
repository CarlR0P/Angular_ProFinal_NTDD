import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  /** Sólo intenta leer localStorage si estamos en el navegador */
  get isLoggedIn(): boolean {
    if (!this.isBrowser) return false;
    return !!localStorage.getItem('token');
  }

  /** Decodifica el rol desde el token JWT */
  private getRolFromToken(): string | null {
    if (!this.isBrowser) return null;
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return (payload.rol || '').toLowerCase();
    } catch {
      return null;
    }
  }

  /** Redirige al menú correcto según el rol */
  irAlMenu() {
    const rol = this.getRolFromToken();

    if (rol === 'administrador') {
      this.router.navigate(['/menu-admin']);
    } else if (rol === 'jugador') {
      this.router.navigate(['/menu-jugador']);
    } else {
      console.warn('Rol desconocido, redirigiendo al inicio');
      this.router.navigate(['/']);
    }
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }
}
