import { Routes } from '@angular/router';
import { HomeComponent } from './paginas/home/home.component';
import { FaqComponent } from './paginas/faq/faq.component';
import { SoporteComponent } from './paginas/soporte/soporte.component';
import { LoginComponent } from './paginas/login/login.component';
import { FormularioRegistroComponent } from './paginas/formulario-registro/formulario-registro.component';
import { ValidacionCodigoComponent } from './paginas/validacion-codigo/validacion-codigo.component';
import { MenuUsuarioComponent } from './paginas/menu-usuario/menu-usuario.component';
import { AjustesUsuarioComponent } from './paginas/ajustes-usuario/ajustes-usuario.component';
import { FormularioModificacionComponent } from './paginas/formulario-modificacion/formulario-modificacion.component';
import { MenuJuegosComponent } from './paginas/menu-juegos/menu-juegos.component';
import { MenuEuroBanderasComponent } from './paginas/juegos/geografia/menu-euro-banderas/menu-euro-banderas.component';
import { JuegoEuroBanderasComponent } from './paginas/juegos/geografia/juego-euro-banderas/juego-euro-banderas.component';

// archivo que se encarga de las rutas entre los componentes del proyecto de Angular
export const routes: Routes = [
    {path: "" , redirectTo: "home" , pathMatch: "full"}, // cuando carga redirecciona a /home
    {path: "home" , component: HomeComponent}, // ruta para la dirección para la página principal
    {path: "faq" , component: FaqComponent}, // ruta para la dirección para la página de preguntas frecuentes (FAQ)
    {path: "soporte" , component: SoporteComponent}, // ruta para la dirección para la página de soporte
    {path: "login" , component: LoginComponent}, // ruta para la dirección para la página de hacer login
    {path: "registro" , component: FormularioRegistroComponent},  // ruta para la dirección para la página de hacer login
    {path: "validacion" , component: ValidacionCodigoComponent},  // ruta para la direccion para la página de validación de codigo por email
    {path: "usuario/:id/menu" , component: MenuUsuarioComponent},  // ruta para la direccion para la página del menu del usuario
    {path: "usuario/:id/ajustes" , component: AjustesUsuarioComponent},  // ruta para la direccion para la página de ajustes del usuario
    {path: "usuario/:id/ajustes/modificar" , component: FormularioModificacionComponent},  // ruta para la direccion al formulario de modificación de datos
    {path: "usuario/:id/:materia" , component: MenuJuegosComponent},  // ruta para la direccion la menu de juegos
    {path: "usuario/:id/geografia/1" , component: MenuEuroBanderasComponent},  // ruta para la direccion la menu de juegos
    {path: "usuario/:id/geografia/1/play" , component: JuegoEuroBanderasComponent},  // ruta para la direccion la menu de juegos
];
