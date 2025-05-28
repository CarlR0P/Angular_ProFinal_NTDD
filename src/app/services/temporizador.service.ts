import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemporizadorService {
  private tiempoInicial = 60; // o 200 si prefieres más tiempo
  private tiempoRestanteSubject = new BehaviorSubject<number>(this.tiempoInicial);
  tiempoRestante$ = this.tiempoRestanteSubject.asObservable();

  private temporizadorSub!: Subscription;

  iniciarTemporizador() {
  if (this.temporizadorSub && !this.temporizadorSub.closed) {
    // Ya está corriendo, no reiniciar
    return;
  }

  // Solo lo inicia si no estaba activo
  this.temporizadorSub = interval(1000).subscribe(() => {
    const nuevoTiempo = this.tiempoRestanteSubject.value - 1;
    this.tiempoRestanteSubject.next(nuevoTiempo);

    if (nuevoTiempo <= 0) {
      this.temporizadorSub.unsubscribe();
    }
  });
}

  detenerTemporizador() {
    if (this.temporizadorSub) this.temporizadorSub.unsubscribe();
  }

  obtenerTiempoActual(): number {
    return this.tiempoRestanteSubject.value;
  }
}
