import { Routes } from '@angular/router';
import { MenuJugadorComponent } from './components/menu-jugador/menu-jugador.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PreguntaComponent } from './components/pregunta/pregunta.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { PartidaInicioComponent } from './components/partida-inicio/partida-inicio.component';
import { PartidaRuletaComponent } from './components/partida-ruleta/partida-ruleta.component';
import { MenuAdminComponent } from './components/menu-admin/menu-admin.component';
import { UserComponent } from './components/usuario/usuario.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { PartidaPreguntaComponent } from './components/partida-pregunta/partida-pregunta.component';
import { PartidaResumenComponent } from './components/partida-resumen/partida-resumen.component';
import { HistorialPartidasComponent } from './components/historial-partidas/historial-partidas.component';

export const routes: Routes = [
    {path: '', component: InicioComponent},
    {path: 'inicio', component: InicioComponent},
    {path: 'login', component: InicioSesionComponent},
    {path: 'registro', component: RegistroComponent },
    {path: 'historialPartidas', component: HistorialPartidasComponent},
    {path: 'pregunta', component: PreguntaComponent},
    {path: 'categoria', component: CategoriaComponent},
    {path: 'menu-jugador', component: MenuJugadorComponent},
    {path: 'partidaInicio', component: PartidaInicioComponent},
    {path: 'partidaRuleta', component: PartidaRuletaComponent},
    {path: 'menu-admin', component: MenuAdminComponent},
    {path: 'usuario', component: UserComponent},
    {path: 'miPerfil', component: MiPerfilComponent},
    {path: 'partidaPregunta', component: PartidaPreguntaComponent},
    {path: 'partidaResumen', component: PartidaResumenComponent},
    {path: 'partidaHistorial', component: HistorialPartidasComponent}
];
