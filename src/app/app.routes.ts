import { Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './components/registro/registro.component';

export const routes: Routes = [
    {path: '', component: InicioComponent},
    {path: 'login', component: InicioSesionComponent},
    {path: 'registro', component: RegistroComponent }
];
