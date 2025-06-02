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
import { MenuNuminario1Component } from './paginas/juegos/matematicas/menu-numinario1/menu-numinario1.component';

// archivo que se encarga de las rutas entre los componentes del proyecto de Angular
export const routes: Routes = [
    {path: "" , redirectTo: "home" , pathMatch: "full"}, // cuando carga se redirecciona a la ruta '/home'
    {path: "home" , component: HomeComponent},           // ruta a la página principal
    {path: "faq" , component: FaqComponent},             // ruta a la página de preguntas frecuentes (FAQ)
    {path: "soporte" , component: SoporteComponent},     // ruta a la página de soporte
    {path: "login" , component: LoginComponent},         // ruta a la página de hacer login
    {path: "registro" , component: FormularioRegistroComponent},   // ruta a la página del formulario de registro
    {path: "validacion" , component: ValidacionCodigoComponent},   // ruta a la página de validación del codigo por email
    {path: "usuario/:id/menu" , component: MenuUsuarioComponent},  // ruta a la página del menu del usuario
    {path: "usuario/:id/ajustes" , component: AjustesUsuarioComponent},  // ruta a la página de ajustes del usuario
    {path: "usuario/:id/ajustes/modificar" , component: FormularioModificacionComponent}, // ruta a la página del formulario de modificación de datos
    {path: "usuario/:id/:materia" , component: MenuJuegosComponent},     // ruta a las páginas de los menus de juegos
    {path: "usuario/:id/geografia/1" , component: MenuEuroBanderasComponent},        // ruta a la página del menu de EuroBanderas
    {path: "usuario/:id/geografia/1/play" , component: JuegoEuroBanderasComponent},  // ruta a la página del juego EuroBanderas
    {path: "usuario/:id/matematicas/1" , component: MenuNuminario1Component},        // ruta a la página del menu de Numinario I
];
