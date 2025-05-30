import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-usuario',
  imports: [],
  templateUrl: './menu-usuario.component.html',
  styleUrl: './menu-usuario.component.css'
})
export class MenuUsuarioComponent {

  // método constructor del componente (se inicializa variables y añadimos servicios)
  constructor(public router:Router) {
    
  }

  // función para abrir el modal de cierre de sesion
  public mostrarModalCerrar():void {
    const dialog = document.getElementById("modal") as HTMLDialogElement;
    dialog.className = "modalMensaje";
    dialog.showModal();
  }

  //funcion que cierra la sesion y direcciona al login
  public cerrarSesion():void {
    this.router.navigate(["/login"]); // se redirecciona a la pagina del login
  }
}
