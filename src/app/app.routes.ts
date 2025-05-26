import { Routes } from '@angular/router';
import { MenuJugadorComponent } from './components/menu-jugador/menu-jugador.component';
import { HistorialPartidasComponent } from './components/historial-partidas/historial-partidas.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PreguntaComponent } from './components/pregunta/pregunta.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { MenuAdminComponent } from './components/menu-admin/menu-admin.component';

export const routes: Routes = [
    {path: '', component: InicioComponent},
    {path: 'login', component: InicioSesionComponent},
    {path: 'registro', component: RegistroComponent },
    {path: 'historialPartidas', component: HistorialPartidasComponent},
    {path: 'pregunta', component: PreguntaComponent},
    {path: 'categoria', component: CategoriaComponent},
    {path: 'menu-jugador', component: MenuJugadorComponent},
    {path: 'menu-admin', component: MenuAdminComponent}
];
