import { Component } from '@angular/core';
import { NavbarIndexComponent } from '../../componentes/navbar-index/navbar-index.component';
import { RedesSocialesComponent } from '../../componentes/redes-sociales/redes-sociales.component';

@Component({
  selector: 'app-login',
  imports: [NavbarIndexComponent, RedesSocialesComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public mensajeError: string;  // variable para el mensaje de error

  // método constructor del componente (inicializa variables)
  constructor(){
    this.mensajeError = "";
  }

  // función para abrir el modal en caso de error en el login (todavia no desarrollado la funcion completa)
  public abrirModal() {
    const dialog = document.getElementById("modalError") as HTMLDialogElement;
    this.mensajeError = "mensaje de error si no puedes acceder"
    if (dialog) {
      dialog.showModal();
    }
  }

}
