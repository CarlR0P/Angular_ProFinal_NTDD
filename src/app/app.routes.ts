import { Routes } from '@angular/router';
import { MenuJugadorComponent } from './components/menu-jugador/menu-jugador.component';
import { HistorialPartidasComponent } from './components/historial-partidas/historial-partidas.component';
import { PartidaComponent } from './components/partida/partida.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './components/registro/registro.component';

export const routes: Routes = [
    {path: '', component: InicioComponent},
    {path: 'login', component: InicioSesionComponent},
    {path: 'registro', component: RegistroComponent },
    {path: 'partida', component: PartidaComponent},
    {path: 'historialPartidas', component: HistorialPartidasComponent}
];
