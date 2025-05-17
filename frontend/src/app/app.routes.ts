import { Routes } from '@angular/router';
import { HomeComponent } from './paginas/home/home.component';
import { FaqComponent } from './paginas/faq/faq.component';
import { SoporteComponent } from './paginas/soporte/soporte.component';
import { LoginComponent } from './paginas/login/login.component';

// archivo que se encarga de las rutas entre los componentes del proyecto de Angular
export const routes: Routes = [
    {path: "" , redirectTo: "home" , pathMatch: "full"}, // cuando carga redirecciona a /home
    {path: "home" , component: HomeComponent}, // ruta para la dirección para la página principal
    {path: "faq" , component: FaqComponent}, // ruta para la dirección para la página de preguntas frecuentes (FAQ)
    {path: "soporte" , component: SoporteComponent}, // ruta para la dirección para la página de soporte
    {path: "login" , component: LoginComponent} // ruta para la dirección para la página de hacer login
];
