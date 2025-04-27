import { Routes } from '@angular/router';
import { HomeComponent } from './paginas/home/home.component';

// archivo que se encarga de las rutas entre los componentes del proyecto de Angular
export const routes: Routes = [
    {path: "" , redirectTo: "home" , pathMatch: "full"}, // cuando carga redirecciona a /home
    {path: "home" , component: HomeComponent} // ruta para la dirección para la página principal
];
